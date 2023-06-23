import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line import/prefer-default-export
export const getLocaleProps =
  (namespaces?: string | string[] | undefined): GetStaticProps =>
  async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(<string>locale, namespaces)),
    },
  });
