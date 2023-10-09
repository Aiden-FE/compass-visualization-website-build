import { createContext } from 'react';
import { VWBAppRendererProps } from '@/components/app-renderer';

const AppContext = createContext<VWBAppRendererProps>({
  appConfig: {
    id: '',
    type: 'application',
    mode: 'preview',
    pages: [],
    platform: 'pc',
  },
});

export default AppContext;
