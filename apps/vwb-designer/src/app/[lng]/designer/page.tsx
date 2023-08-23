'use client';

import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import { VWBApplication, DesignerCentralScheduler, VWBPage } from '@compass-aiden/vwb-core';
import { IS_DEV } from '@/config';
import { CommonPageProps } from '@/interfaces';
import DesignerHeader from './components/designer-header';
import DesignerSidebar from './components/designer-sidebar';
import DesignerSettings from './components/designer-settings';
import DesignerContent from './components/designer-content';

function DesignerPage({ params: { lng } }: CommonPageProps) {
  const [centralScheduler, setCentralScheduler] = useState<DesignerCentralScheduler>();
  const [appConfig, setAppConfig] = useState<VWBApplication>();

  function onSubmit(config: VWBApplication) {
    // eslint-disable-next-line no-console
    console.log('Save config: ', config);
  }

  useEffect(() => {
    const defaultPage = new VWBPage();
    setCentralScheduler(
      new DesignerCentralScheduler({
        logLevel: IS_DEV ? 'debug' : 'log',
        defaultAppConfig: new VWBApplication({
          pages: [defaultPage],
          selectedPageId: defaultPage.id,
        }),
      }),
    );

    return () => {
      centralScheduler?.destroy();
    };
  }, [DesignerCentralScheduler]);

  useEffect(() => {
    const sub = centralScheduler?.change.subscribe((appConf) => setAppConfig(appConf));
    return () => sub?.unsubscribe();
  }, [centralScheduler]);

  return (
    <Layout className="w-full h-full">
      <Layout.Header className="sticky flex items-center bg-white h-12 leading-none">
        {centralScheduler ? (
          <DesignerHeader centralScheduler={centralScheduler} onSubmit={(config) => onSubmit(config)} lang={lng} />
        ) : null}
      </Layout.Header>
      <Layout.Content className="flex relative">
        <DesignerSidebar />
        <main className="flex-1 overflow-auto bg-slate-200 flex justify-center p-4">
          {centralScheduler && appConfig?.selectedPageId ? (
            <DesignerContent
              appConfig={appConfig}
              onUpdatePage={(pageConf) =>
                centralScheduler.updatePage({
                  ...pageConf,
                  id: appConfig.selectedPageId as string,
                })
              }
            />
          ) : null}
        </main>
        <DesignerSettings />
      </Layout.Content>
    </Layout>
  );
}

export default DesignerPage;
