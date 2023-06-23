import { NextPageWithLayout } from '@/app-env';
import { useTranslation } from 'next-i18next';
import { getLocaleProps } from '@/utils';
import CatSvg from '@/assets/svgs/cat.svg';
import { useAppSelector } from '@/stores';
import { useThemeService } from '@/services';
import pageStyles from '@/assets/styles/modules/page.module.scss';
import { useRouter } from 'next/router';
import { AvailableLanguages, AvailableTheme, I18nNamespaces } from '@/config';
import styles from './demo.module.scss';

const DemoPage: NextPageWithLayout = () => {
  const { t, i18n } = useTranslation(I18nNamespaces.COMMON);
  const theme = useAppSelector((state) => state.theme.theme);
  const { getThemeInstance } = useThemeService();

  const router = useRouter();

  function toggleLang() {
    if (i18n.language === AvailableLanguages.ZH_CN) {
      const path = router.asPath;
      router.push(path, path, { locale: AvailableLanguages.EN });
    } else {
      const path = router.asPath;
      router.push(path, path, { locale: AvailableLanguages.ZH_CN });
    }
  }

  function toggleTheme(themeKey: AvailableTheme) {
    getThemeInstance().toggle(themeKey);
  }

  return (
    <section className={`${styles['cp-demo']} ${pageStyles['cp-page']}`}>
      <h1 className={styles['cp-test']}>
        Welcome to <a href="<https://nextjs.org>">Next.js!</a>
        <br />
        Current page is demo.
      </h1>
      Current lang is:
      {i18n.language}
      <br />
      当前语言环境:
      {t('displayLanguage')}
      <br />
      <button onClick={toggleLang} type="button">
        切换语言环境
      </button>
      <br />
      Import svg icon:
      <CatSvg
        className="dark:text-yellow-400"
        style={{
          width: '48px',
          height: '48px',
        }}
      />
      <br />
      Use Iconify:
      <span
        className="icon-[ant-design--ant-design-outlined]"
        style={{
          color: '#00b9b2',
          fontSize: '48px',
        }}
      />
      <br />
      <div className="text-3xl font-bold underline">tailwind example</div>
      BEM example:
      <div className={styles['cp-test']}>
        block
        <div className={styles['cp-test__element']}>element</div>
        <div className={styles['cp-test__element_active']}>modify</div>
      </div>
      Store example:
      <br />
      Current theme:
      {theme}
      <br />
      <button onClick={() => toggleTheme(AvailableTheme.AUTO)} type="button">
        使用默认主题
      </button>
      <br />
      <button onClick={() => toggleTheme(AvailableTheme.LIGHT)} type="button">
        使用亮色主题
      </button>
      <br />
      <button onClick={() => toggleTheme(AvailableTheme.DARK)} type="button">
        使用暗黑主题
      </button>
      <br />
    </section>
  );
};

// 动态路由添加
// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [],
//   fallback: 'blocking',
// });

export const getStaticProps = getLocaleProps(I18nNamespaces.COMMON);

export default DemoPage;
