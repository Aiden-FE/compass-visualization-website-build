/** 可用语言枚举 */
export enum AvailableLanguages {
  ZH_CN = 'zh-CN',
  EN = 'en',
}

/** 可用命名空间枚举 */
export enum AvailableLanguagesNS {
  COMMON = 'common',
  LOGIN = 'login',
  DESIGNER = 'designer',
  MATERIALS = 'materials',
}

export const LanguagesMapping = [
  { key: AvailableLanguages.ZH_CN, label: '简体中文' },
  { key: AvailableLanguages.EN, label: 'English' },
];

export const Languages = LanguagesMapping.map((item) => item.key);

/** 默认语言 */
export const DEFAULT_LANGUAGE = AvailableLanguages.ZH_CN;

/** 默认语言命名空间 */
export const DEFAULT_NS = AvailableLanguagesNS.COMMON;

export function getI18nOptions(
  lng = AvailableLanguages.ZH_CN,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = AvailableLanguagesNS.COMMON,
) {
  return {
    supportedLngs: Languages,
    fallbackLng: DEFAULT_LANGUAGE,
    lng,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns,
  };
}
