import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getLocaleProps =
  (namespaces?: string | string[] | undefined, moreProps?: () => object): GetStaticProps =>
  async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(<string>locale, namespaces)),
      ...(await moreProps?.()),
    },
  });

export default getLocaleProps;
