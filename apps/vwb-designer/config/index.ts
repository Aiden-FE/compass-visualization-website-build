import ThemeConfig from './theme.json';

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
}

export { ThemeConfig };
