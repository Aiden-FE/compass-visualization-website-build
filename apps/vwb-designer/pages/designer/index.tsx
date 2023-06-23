import { NextPageWithLayout } from '@/app-env';
import { getLocaleProps } from '@/utils';
import pageStyles from '@/assets/styles/modules/page.module.scss';
import { I18nNamespaces, IS_DEV } from '@/config';
import { Layout } from 'antd';
import DesignerHeader from '@/components/designer-header';
import { VWBConfiguration } from '@/pages/designer/core';
import { useEffect, useState } from 'react';
import DesignerMaterial from '@/components/designer-sider';
import DesignerMaterialSetting from '@/components/designer-material-setting';
import DesignerContent from '@/components/designer-content';
import DesignerCentralScheduler from './designer-central-scheduler';

const DesignerPage: NextPageWithLayout = () => {
  const [centralScheduler, setCentralScheduler] = useState<DesignerCentralScheduler>();

  function onSubmit(vwbConfig: VWBConfiguration) {
    // eslint-disable-next-line no-console
    console.log('FIXME:  执行保存', vwbConfig);
  }

  useEffect(() => {
    setCentralScheduler(
      new DesignerCentralScheduler({
        debug: IS_DEV,
      }),
    );
  }, [setCentralScheduler]);

  return (
    <Layout className={pageStyles['cp-page']}>
      <Layout.Header className="sticky flex items-center bg-white h-12 leading-none">
        {centralScheduler ? (
          <DesignerHeader centralScheduler={centralScheduler} onSubmit={(config) => onSubmit(config)} />
        ) : null}
      </Layout.Header>

      <Layout.Content className="flex">
        <DesignerMaterial />
        <main className="flex-1 overflow-auto bg-slate-200 flex justify-center">
          {centralScheduler ? <DesignerContent centralScheduler={centralScheduler} /> : null}
        </main>
        <DesignerMaterialSetting />
      </Layout.Content>
    </Layout>
  );
};

// 设置组件读取一个或多个语言文件,下方表示读取 public/{i18n.language}/common.json
export const getStaticProps = getLocaleProps(I18nNamespaces.COMMON);

export default DesignerPage;
