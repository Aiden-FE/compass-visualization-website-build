import { createContext } from 'react';
import { VWBAppRendererProps } from '@/components/app-renderer';

const AppContext = createContext<VWBAppRendererProps>({
  appConfig: {
    id: '',
    mode: 'preview',
    pages: [],
    platform: 'pc',
    language: 'zh-CN',
  },
});

export default AppContext;
