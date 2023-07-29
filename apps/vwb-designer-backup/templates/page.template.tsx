import { NextPageWithLayout } from '@/app-env';
import { getLocaleProps } from '@/utils';
import { useTranslation } from 'next-i18next';
import pageStyles from '@/assets/styles/modules/page.module.scss';
import { I18nNamespaces } from '@/config';

// FIXME: 请根据实际业务修改页面名称
const ExamplePage: NextPageWithLayout = () => {
  const { t } = useTranslation(I18nNamespaces.COMMON);

  return (
    <div className={pageStyles['cp-page']}>
      <h1>
        当前语言环境是
        {t('displayLanguage')}
      </h1>
    </div>
  );
};

// FIXME: 当需要自定义布局时设置,否则请移除下列代码
// ExamplePage.getLayout = (page) => {
//   return (
//     <PrimaryLayout>
//       { page }
//     </PrimaryLayout>
//   );
// };

// FIXME: 动态路由添加,否则请移除下列代码
// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [],
//   fallback: 'blocking',
// });

// 设置组件读取一个或多个语言文件,下方表示读取 public/{i18n.language}/common.json
export const getStaticProps = getLocaleProps(I18nNamespaces.COMMON);

export default ExamplePage;
