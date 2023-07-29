import { NextPageWithLayout } from '@/app-env';
import { getLocaleProps } from '@/utils';
import { useTranslation } from 'next-i18next';
// import pageStyles from '@/assets/styles/modules/page.module.scss';
import { I18nNamespaces } from '@/config';
import { message } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoginPage: NextPageWithLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { t } = useTranslation(I18nNamespaces.COMMON);

  function forgotPassword() {
    messageApi.warning(t('prompts.notSupportRecoveryPassword'));
  }

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    messageApi.warning(t('prompts.signInError'));
  }

  function freeTrial() {
    router.push('/designer');
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {contextHolder}
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          width="48"
          height="48"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('signAccountPrompt')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="" method="POST" onSubmit={(e) => submit(e)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              {t('emailAddress')}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                {t('password')}
              </label>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={forgotPassword}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {t('forgotPassword')}?
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t('signIn')}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {t('notMember')}?
          <button
            type="button"
            onClick={freeTrial}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {t('freeTrial')}
          </button>
        </p>
      </div>
    </div>
  );
};

// 设置组件读取一个或多个语言文件,下方表示读取 public/{i18n.language}/common.json
export const getStaticProps = getLocaleProps(I18nNamespaces.COMMON);

export default LoginPage;
