import { VWBLayoutItem, VWBPage } from '@compass-aiden/vwb-core';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import VWBWidgetRenderer from '@/components/widget-renderer';
import { AppContext } from '@/hooks';

export interface VWBPageRendererProps {
  pageConfig: VWBPage;
  className?: string;
  droppingItem?: { i: string; w: number; h: number };
  onDrop?: (layoutItem: VWBLayoutItem) => void;
}

export default function VWBPageRenderer({ pageConfig, droppingItem, onDrop, className }: VWBPageRendererProps) {
  const appContext = useContext(AppContext);
  // 布局项
  const gridItem = useMemo(() => {
    return pageConfig.layouts.map((item) => {
      const widgetConfig = pageConfig.widgets.find((widget) => widget.id === item.i);
      if (!widgetConfig) {
        console.error(`Not found widget by ${item.i}`);
      }
      return widgetConfig ? (
        <div className="vwb-pr__grid-item" key={item.i}>
          <VWBWidgetRenderer widgetConfig={widgetConfig} />
        </div>
      ) : null;
    });
  }, [pageConfig]);

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  return (
    <ResponsiveGridLayout
      className={`vwb-pr ${className ? className : ''}`}
      layouts={{
        lg: pageConfig.layouts,
        md: pageConfig.layouts,
        sm: pageConfig.layouts,
      }}
      breakpoints={{ lg: 768, md: 375, sm: 0 }}
      cols={{ lg: 12, md: 6, sm: 2 }}
      measureBeforeMount={false}
      preventCollision
      isDroppable={appContext.appConfig.mode === 'editable'}
      droppingItem={droppingItem}
      onDrop={(_, layoutItem) => onDrop?.(layoutItem)}
    >
      {gridItem}
    </ResponsiveGridLayout>
  );
}
