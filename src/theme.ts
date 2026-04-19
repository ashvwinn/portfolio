/**
 * Theme system — the DOM is the source of truth.
 *
 *   - `document.documentElement.dataset.theme` drives all CSS variables.
 *   - An inline <head> script in index.html resolves the initial value
 *     (stored > system preference) before first paint to avoid FOUC.
 *   - React components subscribe via `useTheme` (a MutationObserver
 *     backed useSyncExternalStore) so the hook works regardless of who
 *     flips the attribute — including devtools or OS-level changes.
 */
import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'

const THEME_META_COLORS: Record<Theme, string> = {
  light: '#eae4d2',
  dark: '#0b0b0d',
}

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  const v = document.documentElement.dataset.theme
  return v === 'dark' ? 'dark' : 'light'
}

function subscribe(onChange: () => void) {
  if (typeof document === 'undefined') return () => {}
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = (e: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return
    } catch {
      /* storage disabled — fall through */
    }
    setTheme(e.matches ? 'dark' : 'light', { persist: false })
  }
  media.addEventListener('change', onSystemChange)

  return () => {
    observer.disconnect()
    media.removeEventListener('change', onSystemChange)
  }
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    readTheme,
    () => 'light' as const,
  )
}

export function setTheme(
  theme: Theme,
  { persist = true }: { persist?: boolean } = {},
) {
  document.documentElement.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_META_COLORS[theme])

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      /* storage disabled — theme still applied for this session */
    }
  }
}

export function toggleTheme() {
  setTheme(readTheme() === 'dark' ? 'light' : 'dark')
}
