<script lang="ts">
  import { settings } from '$lib/stores/settings.svelte'
  import { Switch } from '$lib/components/ui/switch'
  import { Label } from '$lib/components/ui/label'
  import { Input } from '$lib/components/ui/input'
  import { Button } from '$lib/components/ui/button'
  import * as Select from '$lib/components/ui/select'
  import { Slider } from '$lib/components/ui/slider'
  import { Play, Square, RefreshCw, Loader2 } from 'lucide-svelte'
  import { GOOGLE_TRANSLATE_LANGUAGES, aiTTSService } from '$lib/services/ai/utils/TTSService'
  import { t } from '$lib/i18n'

  const PREVIEW_TEXT =
    'This is a preview of the selected voice. The story narration will sound like this.'

  let isPlayingPreview = $state(false)
  let isLoadingPreview = $state(false)
  let previewError = $state<string | null>(null)
  interface SystemVoice {
    name: string
    lang: string
  }

  let systemVoices = $state<SystemVoice[]>([])
  let isLoadingVoices = $state(false)

  /**
   * Load system voices when Microsoft provider is selected
   * Uses the TTS service to ensure consistent voice handling
   */
  async function loadSystemVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return
    }

    isLoadingVoices = true

    try {
      // Initialize the service to get properly formatted voices
      await aiTTSService.initialize({
        ...settings.systemServicesSettings.tts,
        provider: 'microsoft',
      })

      const voices = await aiTTSService.getAvailableVoices()
      systemVoices = voices.map((v) => ({ name: v.name, lang: v.lang }))
    } catch (error) {
      console.error('[TTSSettings] Failed to load system voices:', error)
      systemVoices = []
    } finally {
      isLoadingVoices = false
    }
  }

  // Load voices when provider changes to microsoft
  $effect(() => {
    if (settings.systemServicesSettings.tts.provider === 'microsoft') {
      loadSystemVoices()
    }
  })

  const providers = [
    { value: 'openai', label: 'OpenAI Compatible (OpenRouter, OpenAI, Local)' },
    { value: 'google', label: 'Google Translate' },
    { value: 'microsoft', label: 'Windows System TTS (Microsoft SAPI)' },
  ] as const

  /**
   * Validate TTS settings before preview
   */
  function validateTTSSettings(): string | null {
    const tts = settings.systemServicesSettings.tts

    if (tts.provider === 'openai') {
      if (!tts.endpoint || !tts.apiKey) {
        return 'Endpoint and API key are required'
      }
    } else if (tts.provider === 'microsoft') {
      if (!tts.voice) {
        return 'Please select a system voice'
      }
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return 'Speech Synthesis API is not available in your browser'
      }
      if (systemVoices.length > 0 && !systemVoices.some((v) => v.name === tts.voice)) {
        return `Voice "${tts.voice}" not found. Please select a different voice.`
      }
    }
    return null
  }

  async function playVoicePreview() {
    if (!settings.systemServicesSettings.tts.enabled || isPlayingPreview || isLoadingPreview) {
      return
    }

    const validationError = validateTTSSettings()
    if (validationError) {
      previewError = validationError
      return
    }

    const tts = settings.systemServicesSettings.tts

    isLoadingPreview = true
    previewError = null

    try {
      await aiTTSService.initialize(tts)

      isPlayingPreview = true
      isLoadingPreview = false

      await aiTTSService.generateAndPlay(PREVIEW_TEXT, tts.voice)

      isPlayingPreview = false
    } catch (error) {
      console.error('[TTSSettings] Preview failed:', error)
      previewError = error instanceof Error ? error.message : 'Preview failed'
      isPlayingPreview = false
      isLoadingPreview = false
    }
  }

  function stopPreview() {
    aiTTSService.stopPlayback()
    isPlayingPreview = false
    isLoadingPreview = false
  }

  function resetSettings() {
    settings.resetTTSSettings()
    previewError = null
  }
</script>

<div class="space-y-4">
  <!-- Enable TTS Toggle -->
  <div class="flex items-center justify-between">
    <div>
      <Label>{t('tts.enable')}</Label>
      <p class="text-muted-foreground text-xs">{t('tts.enable_description')}</p>
    </div>
    <Switch
      checked={settings.systemServicesSettings.tts.enabled}
      onCheckedChange={(v) => {
        settings.systemServicesSettings.tts.enabled = v
        settings.saveSystemServicesSettings()
      }}
    />
  </div>

  {#if settings.systemServicesSettings.tts.enabled}
    <!-- Provider Selection -->
    <div>
      <Label class="mb-2 block">{t('tts.provider')}</Label>
      <Select.Root
        type="single"
        value={settings.systemServicesSettings.tts.provider}
        onValueChange={(v) => {
          const provider = v as 'openai' | 'google' | 'microsoft'
          const tts = settings.systemServicesSettings.tts

          // Save current voice to provider-specific slot
          if (tts.providerVoices) {
            tts.providerVoices[tts.provider] = tts.voice
          }

          tts.provider = provider

          // Restore provider-specific voice
          if (tts.providerVoices?.[provider]) {
            tts.voice = tts.providerVoices[provider]
          } else {
            // Fallbacks if not initialized
            if (provider === 'openai') tts.voice = 'alloy'
            else if (provider === 'google') tts.voice = 'en'
            else if (provider === 'microsoft') tts.voice = '' // Will be set when user selects from dropdown
          }

          // Ensure google voice is valid
          if (
            provider === 'google' &&
            !GOOGLE_TRANSLATE_LANGUAGES.some((lang) => lang.id === tts.voice)
          ) {
            tts.voice = 'en'
            if (tts.providerVoices) tts.providerVoices['google'] = 'en'
          }

          settings.saveSystemServicesSettings()
        }}
      >
        <Select.Trigger class="h-10 w-full">
          {providers.find((p) => p.value === settings.systemServicesSettings.tts.provider)?.label ??
            'Select provider'}
        </Select.Trigger>
        <Select.Content>
          {#each providers as provider (provider.value)}
            <Select.Item value={provider.value} label={provider.label}>
              {provider.label}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    {#if settings.systemServicesSettings.tts.provider === 'openai'}
      <!-- API Endpoint -->
      <div>
        <Label class="mb-2 block">{t('tts.api_endpoint')}</Label>
        <Input
          type="text"
          class="w-full"
          value={settings.systemServicesSettings.tts.endpoint}
          oninput={(e) => {
            settings.systemServicesSettings.tts.endpoint = e.currentTarget.value
            settings.saveSystemServicesSettings()
          }}
          placeholder="https://api.openai.com/v1/audio/speech"
        />
      </div>

      <!-- API Key -->
      <div>
        <Label class="mb-2 block">{t('tts.api_key')}</Label>
        <Input
          type="password"
          class="w-full"
          value={settings.systemServicesSettings.tts.apiKey}
          oninput={(e) => {
            settings.systemServicesSettings.tts.apiKey = e.currentTarget.value
            settings.saveSystemServicesSettings()
          }}
          placeholder={t('tts.api_key_placeholder')}
        />
      </div>

      <!-- TTS Model -->
      <div>
        <Label class="mb-2 block">{t('tts.model')}</Label>
        <Input
          type="text"
          class="w-full"
          value={settings.systemServicesSettings.tts.model}
          oninput={(e) => {
            settings.systemServicesSettings.tts.model = e.currentTarget.value
            settings.saveSystemServicesSettings()
          }}
          placeholder="tts-1"
        />
      </div>

      <!-- Voice -->
      <div>
        <Label class="mb-2 block">{t('tts.voice')}</Label>
        <Input
          type="text"
          class="w-full"
          value={settings.systemServicesSettings.tts.voice}
          oninput={(e) => {
            const voice = e.currentTarget.value
            settings.systemServicesSettings.tts.voice = voice
            if (settings.systemServicesSettings.tts.providerVoices) {
              settings.systemServicesSettings.tts.providerVoices['openai'] = voice
            }
            settings.saveSystemServicesSettings()
          }}
          placeholder="alloy"
        />
      </div>
    {:else if settings.systemServicesSettings.tts.provider === 'microsoft'}
      <!-- Windows System Voice Selection -->
      <div>
        <Label class="mb-2 block">{t('tts.system_voice')}</Label>
        {#if isLoadingVoices}
          <div class="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2 class="h-4 w-4 animate-spin" />
            {t('tts.loading_voices')}
          </div>
        {:else if systemVoices.length === 0}
          <div class="text-muted-foreground text-sm">
            {t('tts.no_voices_found')}
          </div>
        {:else}
          <Select.Root
            type="single"
            value={settings.systemServicesSettings.tts.voice}
            onValueChange={(v) => {
              settings.systemServicesSettings.tts.voice = v
              if (settings.systemServicesSettings.tts.providerVoices) {
                settings.systemServicesSettings.tts.providerVoices['microsoft'] = v
              }
              settings.saveSystemServicesSettings()
            }}
          >
            <Select.Trigger class="h-10 w-full">
              {systemVoices.find((v) => v.name === settings.systemServicesSettings.tts.voice)
                ?.name ?? 'Select system voice'}
            </Select.Trigger>
            <Select.Content>
              {#each systemVoices as voice (voice.name)}
                <Select.Item value={voice.name} label={voice.name}>
                  {voice.name}
                  <span class="text-muted-foreground ml-2 text-xs">({voice.lang})</span>
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        {/if}
      </div>
    {:else if settings.systemServicesSettings.tts.provider === 'google'}
      <!-- Language Selection -->
      <div>
        <Label class="mb-2 block">{t('tts.language')}</Label>
        <Select.Root
          type="single"
          value={settings.systemServicesSettings.tts.voice}
          onValueChange={(v) => {
            settings.systemServicesSettings.tts.voice = v
            if (settings.systemServicesSettings.tts.providerVoices) {
              settings.systemServicesSettings.tts.providerVoices['google'] = v
            }
            settings.saveSystemServicesSettings()
          }}
        >
          <Select.Trigger class="h-10 w-full">
            {GOOGLE_TRANSLATE_LANGUAGES.find(
              (l) => l.id === settings.systemServicesSettings.tts.voice,
            )?.name ?? 'Select language'}
          </Select.Trigger>
          <Select.Content>
            {#each GOOGLE_TRANSLATE_LANGUAGES as lang (lang.id)}
              <Select.Item value={lang.id} label={lang.name}>
                {lang.name}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    {/if}

    <!-- Voice Preview -->
    <div>
      <Button
        variant="outline"
        class="w-full"
        onclick={isPlayingPreview ? stopPreview : playVoicePreview}
        disabled={isLoadingPreview}
      >
        {#if isLoadingPreview}
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {t('common.loading')}
        {:else if isPlayingPreview}
          <Square class="mr-2 h-4 w-4" />
          {t('tts.stop')}
        {:else}
          <Play class="mr-2 h-4 w-4" />
          {t('tts.preview_voice')}
        {/if}
      </Button>
      {#if previewError}
        <p class="text-destructive mt-2 text-xs">{previewError}</p>
      {/if}
    </div>

    <!-- Volume Control -->
    <div class="border-border bg-muted/20 space-y-4 rounded-lg border p-4">
      <div class="flex items-center justify-between">
        <div>
          <Label>{t('tts.volume_override')}</Label>
          <p class="text-muted-foreground text-xs">{t('tts.volume_override_description')}</p>
        </div>
        <Switch
          checked={settings.systemServicesSettings.tts.volumeOverride}
          onCheckedChange={(v) => {
            settings.systemServicesSettings.tts.volumeOverride = v
            settings.saveSystemServicesSettings()
          }}
        />
      </div>

      {#if settings.systemServicesSettings.tts.volumeOverride}
        <div>
          <Label class="mb-2 block">
            {t('tts.narration_volume')}: {Math.round(settings.systemServicesSettings.tts.volume * 100)}%
          </Label>
          <Slider
            value={settings.systemServicesSettings.tts.volume}
            onValueChange={(v) => {
              settings.systemServicesSettings.tts.volume = v
              settings.saveSystemServicesSettings()
            }}
            type="single"
            min={0}
            max={1}
            step={0.01}
            class="w-full"
          />
        </div>
      {/if}
    </div>

    <!-- Speech Speed -->
    <div>
      <Label class="mb-2 block">
        {t('tts.speech_speed')}: {settings.systemServicesSettings.tts.speed.toFixed(2)}x
      </Label>
      <Slider
        value={settings.systemServicesSettings.tts.speed}
        onValueChange={(v) => {
          settings.systemServicesSettings.tts.speed = v
          settings.saveSystemServicesSettings()
        }}
        type="single"
        min={0.25}
        max={4}
        step={0.05}
        class="w-full"
      />
      <p class="text-muted-foreground mt-1 text-xs">
        {t('tts.speech_speed_description')}
      </p>
    </div>

    <!-- Auto-Play Toggle -->
    <div class="flex items-center justify-between">
      <div>
        <Label>{t('tts.auto_play')}</Label>
        <p class="text-muted-foreground text-xs">
          {t('tts.auto_play_description')}
        </p>
      </div>
      <Switch
        checked={settings.systemServicesSettings.tts.autoPlay}
        onCheckedChange={(v) => {
          settings.systemServicesSettings.tts.autoPlay = v
          settings.saveSystemServicesSettings()
        }}
      />
    </div>

    <!-- Excluded Characters -->
    <div>
      <Label class="mb-2 block">{t('tts.excluded_characters')}</Label>
      <Input
        type="text"
        class="w-full"
        value={settings.systemServicesSettings.tts.excludedCharacters}
        oninput={(e) => {
          settings.systemServicesSettings.tts.excludedCharacters = e.currentTarget.value
          settings.saveSystemServicesSettings()
        }}
        placeholder={t('tts.excluded_characters_placeholder')}
      />
      <p class="text-muted-foreground mt-1 text-xs">{t('tts.excluded_characters_description')}</p>
    </div>
    <div class="border-border bg-muted/20 space-y-4 rounded-lg border p-4">
      <!-- Remove HTML tags Toggle -->
      <div class="flex items-center justify-between">
        <div>
          <Label>{t('tts.remove_html_tags')}</Label>
          <p class="text-muted-foreground text-xs">
            {t('tts.remove_html_tags_description')}
          </p>
        </div>
        <Switch
          checked={settings.systemServicesSettings.tts.removeHtmlTags}
          onCheckedChange={(v) => {
            settings.systemServicesSettings.tts.removeHtmlTags = v
            settings.saveSystemServicesSettings()
          }}
        />
      </div>

      {#if settings.systemServicesSettings.tts.removeHtmlTags}
        <!-- HTML tags to remove content from -->
        <div>
          <Label class="mb-2 block">{t('tts.html_tags_to_remove')}</Label>
          <Input
            type="text"
            class="w-full"
            value={settings.systemServicesSettings.tts.htmlTagsToRemoveContent}
            oninput={(e) => {
              settings.systemServicesSettings.tts.htmlTagsToRemoveContent = e.currentTarget.value
              settings.saveSystemServicesSettings()
            }}
            placeholder={t('tts.html_tags_to_remove_placeholder')}
            disabled={settings.systemServicesSettings.tts.removeAllHtmlContent}
          />
          <p class="text-muted-foreground mt-1 text-xs">
            {t('tts.html_tags_to_remove_description')}
          </p>
        </div>

        <!-- Remove all tag content Toggle -->
        <div class="flex items-center justify-between">
          <div>
            <Label>{t('tts.remove_all_tag_content')}</Label>
            <p class="text-muted-foreground text-xs">
              {t('tts.remove_all_tag_content_description')}
            </p>
          </div>
          <Switch
            checked={settings.systemServicesSettings.tts.removeAllHtmlContent}
            onCheckedChange={(v) => {
              settings.systemServicesSettings.tts.removeAllHtmlContent = v
              settings.saveSystemServicesSettings()
            }}
          />
        </div>
      {/if}
    </div>
    <!-- Reset Button -->
    <Button variant="outline" size="sm" onclick={resetSettings}>
      <RefreshCw class="mr-1 h-3 w-3" />
      {t('common.reset_to_defaults')}
    </Button>
  {/if}
</div>
