/**
 * i18n: 简体中文界面支持
 *
 * Lightweight translation system for Aventuras Simplified Chinese UI.
 * Uses a reactive Svelte 5 rune store and a simple `t()` function.
 */
import zhCN from './zh-CN'

const _locale = 'zh-CN'
const _messages: Record<string, string> = zhCN

/** Simple mustache-style interpolation: t('time.format', {year:2, day:1, hours:12, minutes:30}) */
function interpolate(tpl: string, vars?: Record<string, string | number>): string {
  if (!vars) return tpl
  return tpl.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`))
}

/**
 * Translate a key into Simplified Chinese.
 * Falls back to the key itself if no translation is found.
 */
export function t(key: string, vars?: Record<string, string | number>): string {
  const msg = _messages[key]
  if (msg === undefined) return key
  return interpolate(msg, vars)
}

/** Helper: `t()` with the key itself as fallback, useful for dynamic strings */
export const _ = t

/** All supported language codes */
export const locales = ['zh-CN' as const] as const
export type Locale = (typeof locales)[number]
