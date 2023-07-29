import React from 'react';
import { StoresProvider } from '@/stores';
import InitClientWrap from './init-client-wrap';
import AntdConfigProvider from './antd-config-provider';

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
