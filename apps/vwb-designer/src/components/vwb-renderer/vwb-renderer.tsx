import { Responsive } from 'react-grid-layout';
import { useState, useMemo, createRef } from 'react';
import AppEmpty from '@/components/app-empty';
import { LayoutItem } from './interfaces';
import VWBWidgetRenderer from './vwb-widget-renderer';

export default function VWBRenderer() {
  const [layouts, setLayouts] = useState<LayoutItem[]>([]);

  function onDrop(_: unknown, layoutItem: LayoutItem) {
    setLayouts([
      ...layouts,
      new LayoutItem({
        ...layoutItem,
        i: undefined,
      }),
    ]);
  }

  const renderGridWidget = (layout: LayoutItem) => {
    const ref = createRef<HTMLDivElement>();
    return <VWBWidgetRenderer data-grid={layout} ref={ref} key={layout.i} layout={layout} />;
  };

  const WidgetRenderer = useMemo(() => {
    return layouts?.length ? layouts.map(renderGridWidget) : null;
  }, [layouts]);

  return (
    <Responsive
      className="vwb-renderer border-dashed border-1 border-[var(--vwb-primary-color)] bg-white"
      width={100}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isDroppable
      measureBeforeMount={false}
      preventCollision
      compactType="vertical"
      onDrop={(layout: unknown, layoutItem: LayoutItem) => onDrop(layout, layoutItem)}
    >
      {WidgetRenderer || <AppEmpty />}
    </Responsive>
  );
}
