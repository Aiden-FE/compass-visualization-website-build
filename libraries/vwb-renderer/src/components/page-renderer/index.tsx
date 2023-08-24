import { VWBPage } from '@compass-aiden/vwb-core';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import VWBWidgetRenderer from '@/components/widget-renderer';

export interface VWBPageRendererProps {
  pageConfig: VWBPage;
  breakpoints?: { [p: string]: number };
  cols?: { [p: string]: number };
}

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function VWBPageRenderer({ pageConfig }: VWBPageRendererProps) {
  const gridItem = useMemo(() => {
    return pageConfig.layouts.map((item) => {
      return (
        <div className="vwb-pr__grid-item" key={item.i}>
          <VWBWidgetRenderer />
        </div>
      );
    });
  }, [pageConfig]);
  return (
    <ResponsiveGridLayout
      className="vwb-pr"
      layouts={{
        lg: pageConfig.layouts,
        md: pageConfig.layouts,
        sm: pageConfig.layouts,
        xs: pageConfig.layouts,
      }}
    >
      {gridItem}
    </ResponsiveGridLayout>
  );
}
