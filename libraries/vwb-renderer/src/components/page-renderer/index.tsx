import { pageValidate, VWBApplication, VWBLayoutItem, VWBPage, VWBWidget } from '@compass-aiden/vwb-core';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { MouseEvent, useEffect } from 'react';
import VWBWidgetRenderer from '@/components/widget-renderer';

export interface VWBPageRendererProps {
  pageConfig: VWBPage;
  className?: string;
  droppingItem?: { i: string; w: number; h: number };
  onDrop?: (layoutItem: VWBLayoutItem) => void;
  mode?: VWBApplication['mode'];
  onSelect?: (params: { config: VWBPage | VWBWidget; ref: HTMLDivElement | null; event: MouseEvent }) => void;
}

export default function VWBPageRenderer({
  pageConfig,
  droppingItem,
  onDrop,
  className,
  onSelect,
  mode = 'preview',
}: VWBPageRendererProps) {
  const isEditable = useMemo(() => mode === 'editable', [mode]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageValidate(pageConfig)) {
      throw new Error('The acquired page data is not the expected data.');
    }
  }, [pageConfig]);

  // 布局项
  const gridItem = useMemo(() => {
    return pageConfig.layouts.map((item) => {
      const widgetConfig = pageConfig.widgets.find((widget) => widget.id === item.i);
      if (!widgetConfig) {
        // eslint-disable-next-line no-console
        console.error(`Not found widget by ${item.i}`);
      }
      return widgetConfig ? (
        <div className="vwb-pr__grid-item" key={item.i}>
          <VWBWidgetRenderer
            widgetConfig={widgetConfig}
            mode={mode}
            onSelect={isEditable ? (params) => onSelect?.(params) : undefined}
          />
        </div>
      ) : null;
    });
  }, [pageConfig, isEditable, onSelect, mode]);

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  function onPageSelected(e: MouseEvent) {
    e.stopPropagation();
    onSelect?.({
      ref: containerRef.current,
      event: e,
      config: pageConfig,
    });
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`vwb-pr w-full h-full ${className || ''}`}
      ref={containerRef}
      onClick={isEditable ? (e: MouseEvent) => onPageSelected(e) : undefined}
    >
      <ResponsiveGridLayout
        className="vwb-pr__grid-layout w-full !h-full"
        layouts={{
          lg: pageConfig.layouts,
          md: pageConfig.layouts,
          sm: pageConfig.layouts,
        }}
        breakpoints={{ lg: 768, md: 375, sm: 0 }}
        cols={{ lg: 12, md: 6, sm: 2 }}
        measureBeforeMount={false}
        preventCollision
        isDroppable={isEditable}
        droppingItem={droppingItem}
        onDrop={(_, layoutItem) => onDrop?.(layoutItem)}
      >
        {gridItem}
      </ResponsiveGridLayout>
    </div>
  );
}
