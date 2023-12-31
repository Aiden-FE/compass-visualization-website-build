import VWBAppRenderer from './components/app-renderer';
import VWBPageRenderer from './components/page-renderer';
import VWBWidgetRenderer from './components/widget-renderer';
import '@/assets/styles/global.scss';

export * from './utils/components-registry';
export { VWBAppRenderer, VWBPageRenderer, VWBWidgetRenderer };
export type { VWBAppRendererRef } from './components/app-renderer';
