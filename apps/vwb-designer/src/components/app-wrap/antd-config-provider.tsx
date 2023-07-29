'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { useAppSelector } from '@/stores';

function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  const antdTheme = useAppSelector((state) => state.theme.antdTheme);

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}

export default AntdConfigProvider;
