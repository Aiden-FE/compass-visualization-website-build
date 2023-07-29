import type { AppProps } from 'next/app';
import { NextPageWithLayout } from '@/app-env';
import { appWithTranslation } from 'next-i18next';
import '@/assets/styles/globals.scss';
import { AppProviders, themeActions, useAppDispatch, useAppSelector } from '@/stores';
import { useThemeService } from '@/services';
import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { initSystemGlobalDeps, getSystemjs } from '@/utils/systemjs.util';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function WrapApp({ children }: { children: React.ReactNode }) {
  const { initTheme } = useThemeService();
  const dispatch = useAppDispatch();
  const antdTheme = useAppSelector((state) => state.theme.antdTheme);

  const [systemLoaded, setSystemLoaded] = useState(false);

  getSystemjs().then(() => {
    setSystemLoaded(true);
    initSystemGlobalDeps();
  });

  useEffect(() => {
    initTheme((themeName, themeData) => {
      dispatch(
        themeActions.setTheme({
          theme: themeName,
          themeData,
        }),
      );
    });
  });

  return <ConfigProvider theme={antdTheme}>{systemLoaded ? children : null}</ConfigProvider>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 如果这个 layout 是可用的，则在页面中使用
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AppProviders>
      <WrapApp>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </WrapApp>
    </AppProviders>,
  );
}

export default appWithTranslation(MyApp);
