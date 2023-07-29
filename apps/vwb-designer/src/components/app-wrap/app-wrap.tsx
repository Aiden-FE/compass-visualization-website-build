import React from 'react';
import { StoresProvider } from '@/stores';
import InitClientWrap from '@/components/app-wrap/init-client-wrap';
import AntdConfigProvider from '@/components/app-wrap/antd-config-provider';

function AppWrap({ children }: { children: React.ReactNode }) {
  return (
    <StoresProvider>
      <InitClientWrap>
        <AntdConfigProvider>{children}</AntdConfigProvider>
      </InitClientWrap>
    </StoresProvider>
  );
}

export default AppWrap;
