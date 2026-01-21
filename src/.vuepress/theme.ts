import { defaultTheme } from '@vuepress/theme-default'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export const localTheme = (options: DefaultThemeOptions) => {
  return defaultTheme({
    ...options,
  })
}
