import { VWBApplication, VWBPage } from '@compass-aiden/vwb-core';
import { useEffect, useState } from 'react';
import VWBPageRenderer, { VWBPageRendererProps } from '@/components/page-renderer';
import AppContext from '@/hooks/use-app-context';

export interface VWBAppRendererProps {
  appConfig: VWBApplication;
  pageProps?: Omit<VWBPageRendererProps, 'pageConfig'>;
}

export default function VWBAppRenderer({ appConfig, pageProps }: VWBAppRendererProps) {
  const [pageConfig, setPageConfig] = useState<VWBPage>();
  useEffect(() => {
    if (appConfig.selectedPageId) {
      const pageConf = appConfig.pages.find((page) => page.id === appConfig.selectedPageId);
      setPageConfig(pageConf);
    }
    return () => setPageConfig(undefined);
  }, [appConfig]);
  return (
    <AppContext.Provider
      value={{
        appConfig,
      }}
    >
      {pageConfig && <VWBPageRenderer pageConfig={pageConfig} {...(pageProps || {})} />}
    </AppContext.Provider>
  );
}
