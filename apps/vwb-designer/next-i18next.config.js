/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    domains: [
      // Local test
      {
        domain: 'localhost',
        defaultLocale: 'zh-CN',
        http: true,
      },
    ],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: {
    default: ['zh-CN'],
  },
};
