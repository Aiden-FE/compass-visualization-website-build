import ThemeConfig from './theme.json';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const IS_CLIENT = typeof window !== 'undefined';

export enum AvailableLanguages {
  ZH_CN = 'zh-CN',
  EN = 'en',
}

export enum AvailableTheme {
  /** 跟随系统主题变化 */
  AUTO = 'default',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum I18nNamespaces {
  COMMON = 'common',
  DESIGNER = 'designer',
}

export { ThemeConfig };