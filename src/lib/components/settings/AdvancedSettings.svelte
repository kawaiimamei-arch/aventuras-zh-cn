<script lang="ts">
  import { settings } from '$lib/stores/settings.svelte'
  import {
    ChevronDown,
    RotateCcw,
    FolderOpen,
    BookOpen,
    Brain,
    Search,
    Bug,
    Code2,
    Layers,
    ListTree,
    Sparkles,
  } from 'lucide-svelte'
  import { Switch } from '$lib/components/ui/switch'
  import { Label } from '$lib/components/ui/label'
  import { Button } from '$lib/components/ui/button'
  import { Slider } from '$lib/components/ui/slider'
  import * as Collapsible from '$lib/components/ui/collapsible'
  import { Separator } from '$lib/components/ui/separator'
  import { t } from '$lib/i18n'

  // Section visibility state
  let showLorebookImportSection = $state(false)
  let showLoreManagementSection = $state(false)
  let showClassifierSection = $state(false)
  let showEntryRetrievalSection = $state(false)
  let showContextWindowSection = $state(false)
  let showLorebookLimitsSection = $state(false)
  let showAgenticRetrievalSection = $state(false)

  // Manual mode toggle handler
  async function handleManualModeToggle(checked: boolean) {
    await settings.setAdvancedManualMode(checked)
  }

  // Debug mode toggle handler
  function handleDebugModeToggle(checked: boolean) {
    settings.setDebugMode(checked)
  }
</script>

<div class="space-y-6">
  <!-- General Settings -->
  <div class="space-y-4">
    <!-- Manual Request Mode -->
    <div class="flex flex-row items-center justify-between">
      <div class="space-y-0.5">
        <div class="flex items-center gap-2">
          <Code2 class="text-muted-foreground h-4 w-4" />
          <Label>{t('advanced.manual_request_mode')}</Label>
        </div>
        <p class="text-muted-foreground text-xs">
          {t('advanced.manual_request_mode_description')}
        </p>
        {#if settings.advancedRequestSettings.manualMode}
          <p class="pt-1 text-xs font-medium text-amber-500">
            {t('advanced.manual_mode_active')}
          </p>
        {/if}
      </div>
      <Switch
        checked={settings.advancedRequestSettings.manualMode}
        onCheckedChange={handleManualModeToggle}
      />
    </div>

    <!-- Debug Mode -->
    <div class="flex flex-row items-center justify-between">
      <div class="space-y-0.5">
        <div class="flex items-center gap-2">
          <Bug class="text-muted-foreground h-4 w-4" />
          <Label>{t('advanced.debug_mode')}</Label>
        </div>
        <p class="text-muted-foreground text-xs">{t('advanced.debug_mode_description')}</p>
        {#if settings.uiSettings.debugMode}
          <p class="pt-1 text-xs font-medium text-amber-500">
            {t('advanced.logs_session_only')}
          </p>
        {/if}
      </div>
      <Switch checked={settings.uiSettings.debugMode} onCheckedChange={handleDebugModeToggle} />
    </div>
  </div>

  <Separator />

  <!-- Service Configurations -->
  <div class="space-y-3">
    <!-- Lorebook Import Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showLorebookImportSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 transition-colors group-hover/trigger:bg-green-500/20"
            >
              <FolderOpen class="h-4 w-4 text-green-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.lorebook_import')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">{t('advanced.lorebook_import_description')}</p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => settings.resetLorebookClassifierSpecificSettings()}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showLorebookImportSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Batch Size -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.batch_size')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.lorebookClassifier?.batchSize ?? 50}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.lorebookClassifier?.batchSize ?? 50}
                min={10}
                max={100}
                step={10}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.lorebookClassifier.batchSize = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <div
                class="text-muted-foreground flex justify-between text-[10px] font-medium tracking-wider uppercase"
              >
                <span>{t('advanced.reliable')}</span>
                <span>{t('advanced.fast')}</span>
              </div>
            </div>

            <!-- Max Concurrent -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.max_concurrent_requests')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.lorebookClassifier?.maxConcurrent ?? 5}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.lorebookClassifier?.maxConcurrent ?? 5}
                min={1}
                max={10}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.lorebookClassifier.maxConcurrent = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <div
                class="text-muted-foreground flex justify-between text-[10px] font-medium tracking-wider uppercase"
              >
                <span>{t('advanced.sequential')}</span>
                <span>{t('advanced.parallel')}</span>
              </div>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>

    <!-- Lore Management Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showLoreManagementSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500/10 transition-colors group-hover/trigger:bg-purple-500/20"
            >
              <BookOpen class="h-4 w-4 text-purple-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.lore_management')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">{t('advanced.lore_management_description')}</p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => settings.resetLoreManagementSettings()}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showLoreManagementSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Max Iterations -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.max_iterations')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.systemServicesSettings.loreManagement?.maxIterations ?? 50}
                </span>
              </div>
              <Slider
                value={settings.systemServicesSettings.loreManagement?.maxIterations ?? 50}
                min={10}
                max={100}
                step={5}
                type="single"
                onValueChange={(v) => {
                  settings.systemServicesSettings.loreManagement.maxIterations = v
                  settings.saveSystemServicesSettings()
                }}
              />
              <div
                class="text-muted-foreground flex justify-between text-[10px] font-medium tracking-wider uppercase"
              >
                <span>{t('advanced.conservative')}</span>
                <span>{t('advanced.extensive')}</span>
              </div>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>

    <!-- Classifier Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showClassifierSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 transition-colors group-hover/trigger:bg-cyan-500/20"
            >
              <Brain class="h-4 w-4 text-cyan-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.world_state_classifier')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">{t('advanced.world_state_classifier_description')}</p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => settings.resetClassifierSettings()}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showClassifierSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Chat History Truncation -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.chat_history_truncation')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.systemServicesSettings.classifier?.chatHistoryTruncation === 0
                    ? t('advanced.no_limit')
                    : (settings.systemServicesSettings.classifier?.chatHistoryTruncation ?? 0)}
                </span>
              </div>
              <Slider
                value={settings.systemServicesSettings.classifier?.chatHistoryTruncation ?? 0}
                min={0}
                max={500}
                step={50}
                type="single"
                onValueChange={(v) => {
                  settings.systemServicesSettings.classifier.chatHistoryTruncation = v
                  settings.saveSystemServicesSettings()
                }}
              />
              <div
                class="text-muted-foreground flex justify-between text-[10px] font-medium tracking-wider uppercase"
              >
                <span>{t('advanced.unlimited')}</span>
                <span>{t('advanced.words_500')}</span>
              </div>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>

    <!-- Entry Retrieval Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showEntryRetrievalSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10 transition-colors group-hover/trigger:bg-amber-500/20"
            >
              <Search class="h-4 w-4 text-amber-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.entry_retrieval')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">{t('advanced.entry_retrieval_description')}</p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => settings.resetEntryRetrievalSettings()}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showEntryRetrievalSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Enable LLM Selection -->
            <div class="flex flex-row items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-sm">{t('advanced.enable_llm_selection')}</Label>
                <p class="text-muted-foreground text-xs">
                  {t('advanced.enable_llm_selection_description')}
                </p>
              </div>
              <Switch
                checked={settings.systemServicesSettings.entryRetrieval?.enableLLMSelection ?? true}
                onCheckedChange={(v) => {
                  settings.systemServicesSettings.entryRetrieval.enableLLMSelection = v
                  settings.saveSystemServicesSettings()
                }}
              />
            </div>

            <!-- Max Tier 3 Entries -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.max_tier3_entries')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.systemServicesSettings.entryRetrieval?.maxTier3Entries === 0
                    ? t('advanced.unlimited')
                    : (settings.systemServicesSettings.entryRetrieval?.maxTier3Entries ?? 0)}
                </span>
              </div>
              <Slider
                value={settings.systemServicesSettings.entryRetrieval?.maxTier3Entries ?? 0}
                min={0}
                max={20}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.systemServicesSettings.entryRetrieval.maxTier3Entries = v
                  settings.saveSystemServicesSettings()
                }}
              />
              <div
                class="text-muted-foreground flex justify-between text-[10px] font-medium tracking-wider uppercase"
              >
                <span>{t('advanced.unlimited')}</span>
                <span>{t('advanced.entries_20')}</span>
              </div>
            </div>

            <!-- Max Words Per Entry -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.max_words_per_entry')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.systemServicesSettings.entryRetrieval?.maxWordsPerEntry === 0
                    ? t('advanced.unlimited')
                    : (settings.systemServicesSettings.entryRetrieval?.maxWordsPerEntry ?? 0)}
                </span>
              </div>
              <Slider
                value={settings.systemServicesSettings.entryRetrieval?.maxWordsPerEntry ?? 0}
                min={0}
                max={1000}
                step={50}
                type="single"
                onValueChange={(v) => {
                  settings.systemServicesSettings.entryRetrieval.maxWordsPerEntry = v
                  settings.saveSystemServicesSettings()
                }}
              />
              <div
                class="text-muted-foreground flex justify-between text-[10px] font-medium tracking-wider uppercase"
              >
                <span>{t('advanced.unlimited')}</span>
                <span>{t('advanced.words_1000')}</span>
              </div>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>

    <!-- Memory Retrieval Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showAgenticRetrievalSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-pink-500/10 transition-colors group-hover/trigger:bg-pink-500/20"
            >
              <Sparkles class="h-4 w-4 text-pink-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.memory_retrieval')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">
                {t('advanced.memory_retrieval_description')}
              </p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => {
                settings.resetTimelineFillSettings()
                settings.resetAgenticRetrievalSpecificSettings()
              }}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showAgenticRetrievalSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Enable Memory Retrieval -->
            <div class="flex flex-row items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-sm">{t('advanced.enable_memory_retrieval')}</Label>
                <p class="text-muted-foreground text-xs">
                  {t('advanced.enable_memory_retrieval_description')}
                </p>
              </div>
              <Switch
                checked={settings.systemServicesSettings.timelineFill?.enabled ?? true}
                onCheckedChange={(v) => {
                  settings.systemServicesSettings.timelineFill.enabled = v
                  settings.saveSystemServicesSettings()
                }}
              />
            </div>

            {#if settings.systemServicesSettings.timelineFill?.enabled}
              <!-- Mode Selection -->
              <div class="space-y-3">
                <Label>{t('advanced.retrieval_mode')}</Label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    class="flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors {settings
                      .systemServicesSettings.timelineFill?.mode === 'static' ||
                    !settings.systemServicesSettings.timelineFill?.mode
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'}"
                    onclick={() => {
                      settings.systemServicesSettings.timelineFill.mode = 'static'
                      settings.saveSystemServicesSettings()
                    }}
                  >
                    <span class="text-sm font-medium">{t('advanced.static')}</span>
                    <span class="text-muted-foreground text-xs">
                      {t('advanced.static_description')}
                    </span>
                  </button>
                  <button
                    class="flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors {settings
                      .systemServicesSettings.timelineFill?.mode === 'agentic'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'}"
                    onclick={() => {
                      settings.systemServicesSettings.timelineFill.mode = 'agentic'
                      settings.saveSystemServicesSettings()
                    }}
                  >
                    <span class="text-sm font-medium">{t('advanced.agentic')}</span>
                    <span class="text-muted-foreground text-xs">
                      {t('advanced.agentic_description')}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Static Mode Options -->
              {#if settings.systemServicesSettings.timelineFill?.mode === 'static' || !settings.systemServicesSettings.timelineFill?.mode}
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <Label>{t('advanced.max_queries')}</Label>
                    <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                      {settings.systemServicesSettings.timelineFill?.maxQueries ?? 5}
                    </span>
                  </div>
                  <Slider
                    value={settings.systemServicesSettings.timelineFill?.maxQueries ?? 5}
                    min={1}
                    max={10}
                    step={1}
                    type="single"
                    onValueChange={(v) => {
                      settings.systemServicesSettings.timelineFill.maxQueries = v
                      settings.saveSystemServicesSettings()
                    }}
                  />
                  <p class="text-muted-foreground text-xs">
                    {t('advanced.max_queries_description')}
                  </p>
                </div>
              {/if}

              <!-- Agentic Mode Options -->
              {#if settings.systemServicesSettings.timelineFill?.mode === 'agentic'}
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <Label>{t('advanced.max_iterations')}</Label>
                    <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                      {settings.systemServicesSettings.agenticRetrieval?.maxIterations ?? 30}
                    </span>
                  </div>
                  <Slider
                    value={settings.systemServicesSettings.agenticRetrieval?.maxIterations ?? 30}
                    min={1}
                    max={30}
                    step={1}
                    type="single"
                    onValueChange={(v) => {
                      settings.systemServicesSettings.agenticRetrieval.maxIterations = v
                      settings.saveSystemServicesSettings()
                    }}
                  />
                  <p class="text-muted-foreground text-xs">
                    {t('advanced.max_iterations_retrieval_description')}
                  </p>
                </div>
              {/if}
            {/if}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>

    <!-- Context Window Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showContextWindowSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 transition-colors group-hover/trigger:bg-blue-500/20"
            >
              <Layers class="h-4 w-4 text-blue-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.context_window')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">
                {t('advanced.context_window_description')}
              </p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => settings.resetContextWindowSettings()}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showContextWindowSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Retrieval Context -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.retrieval_classification')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.contextWindow?.recentEntriesForRetrieval ?? 5} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.contextWindow?.recentEntriesForRetrieval ??
                  5}
                min={2}
                max={15}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.contextWindow.recentEntriesForRetrieval = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">
                {t('advanced.retrieval_classification_description')}
              </p>
            </div>

            <!-- Tiered Context -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.tiered_context_building')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.contextWindow?.recentEntriesForTiered ?? 10} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.contextWindow?.recentEntriesForTiered ?? 10}
                min={3}
                max={20}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.contextWindow.recentEntriesForTiered = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">{t('advanced.tiered_context_description')}</p>
            </div>

            <!-- Action Choices Context -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.action_choices')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.contextWindow?.recentEntriesForChoices ?? 5} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.contextWindow?.recentEntriesForChoices ?? 5}
                min={1}
                max={10}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.contextWindow.recentEntriesForChoices = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">{t('advanced.action_choices_description')}</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>

    <!-- Lorebook Limits Settings -->
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <Collapsible.Root bind:open={showLorebookLimitsSection}>
        <div class="flex items-center gap-3 p-3 pl-4">
          <Collapsible.Trigger class="group/trigger flex flex-1 items-center gap-2 text-left">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 transition-colors group-hover/trigger:bg-orange-500/20"
            >
              <ListTree class="h-4 w-4 text-orange-500" />
            </div>
            <div class="flex-1">
              <Label class="leading-none font-medium">{t('advanced.lorebook_limits')}</Label>
              <p class="text-muted-foreground mt-1 text-xs">{t('advanced.lorebook_limits_description')}</p>
            </div>
          </Collapsible.Trigger>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              onclick={() => settings.resetLorebookLimitsSettings()}
              title={t('common.reset_to_default')}
            >
              <RotateCcw class="h-3.5 w-3.5" />
            </Button>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" size="icon" class="h-8 w-8">
                  {#if showLorebookLimitsSection}
                    <ChevronDown class="h-4 w-4 rotate-180 transition-transform duration-200" />
                  {:else}
                    <ChevronDown class="h-4 w-4 transition-transform duration-200" />
                  {/if}
                  <span class="sr-only">{t('common.toggle')}</span>
                </Button>
              {/snippet}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div class="bg-muted/10 space-y-6 border-t p-4">
            <!-- Max for Suggestions -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.suggestions')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.lorebookLimits?.maxForSuggestions ?? 15} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.lorebookLimits?.maxForSuggestions ?? 15}
                min={5}
                max={30}
                step={5}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.lorebookLimits.maxForSuggestions = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">{t('advanced.suggestions_description')}</p>
            </div>

            <!-- Max for Action Choices -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.action_choices')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.lorebookLimits?.maxForActionChoices ?? 12} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.lorebookLimits?.maxForActionChoices ?? 12}
                min={5}
                max={25}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.lorebookLimits.maxForActionChoices = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">{t('advanced.action_choices_limits_description')}</p>
            </div>

            <!-- Max per Tier -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.per_tier')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.lorebookLimits?.maxEntriesPerTier ?? 20} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.lorebookLimits?.maxEntriesPerTier ?? 20}
                min={3}
                max={20}
                step={1}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.lorebookLimits.maxEntriesPerTier = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">{t('advanced.per_tier_description')}</p>
            </div>

            <!-- LLM Threshold -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <Label>{t('advanced.llm_selection_threshold')}</Label>
                <span class="bg-muted rounded px-2 py-0.5 text-xs font-medium">
                  {settings.serviceSpecificSettings.lorebookLimits?.llmThreshold ?? 30} {t('advanced.entries_lower')}
                </span>
              </div>
              <Slider
                value={settings.serviceSpecificSettings.lorebookLimits?.llmThreshold ?? 30}
                min={10}
                max={100}
                step={10}
                type="single"
                onValueChange={(v) => {
                  settings.serviceSpecificSettings.lorebookLimits.llmThreshold = v
                  settings.saveServiceSpecificSettings()
                }}
              />
              <p class="text-muted-foreground text-xs">
                {t('advanced.llm_threshold_description')}
              </p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  </div>
</div>
