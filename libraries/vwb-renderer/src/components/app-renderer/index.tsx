import { VWBApplication } from '@compass-aiden/vwb-core';
import VWBPageRenderer, { VWBPageRendererProps } from '@/components/page-renderer';

export interface VWBAppRendererProps {
  appConfig: VWBApplication;
  pageProps?: VWBPageRendererProps;
}

export default function VWBAppRenderer({ appConfig, pageProps }: VWBAppRendererProps) {
  return appConfig.selectedPage ? <VWBPageRenderer pageConfig={appConfig.selectedPage} {...pageProps} /> : null;
}
