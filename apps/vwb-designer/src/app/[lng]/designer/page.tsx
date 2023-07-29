'use client';

import { Layout } from 'antd';

function DesignerPage() {
  return (
    <Layout className="w-full h-full">
      <Layout.Header className="sticky flex items-center bg-white h-12 leading-none">header</Layout.Header>
      <Layout.Content className="flex relative">Content</Layout.Content>
    </Layout>
  );
}

export default DesignerPage;
