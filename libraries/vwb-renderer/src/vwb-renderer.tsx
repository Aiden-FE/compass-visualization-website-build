import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState, useMemo } from 'react';
import { VWBLayout } from '@compass-aiden/vwb-core';
import VWBWidget from '@/components/vwb-widget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface IVWBRendererProps {}

export default function VWBRenderer() {
  const [layouts, setLayouts] = useState<VWBLayout[]>([]);

  /**
   * @desc 当放置后生成目标布局
   * @param _
   * @param layoutItem
   */
  function onDrop(_: unknown, layoutItem: VWBLayout) {
    setLayouts([
      ...layouts,
      new VWBLayout({
        ...layoutItem,
        i: undefined,
      }),
    ]);
  }

  /**
   * @desc 根据布局生成布局组件
   * @param layout
   */
  const renderWidgets = useMemo(() => {
    return layouts?.length
      ? layouts.map((layout: VWBLayout) => {
          return (
            <div className="vwb-grid-layout__item overflow-auto" key={layout.i}>
              <VWBWidget layout={layout} />
            </div>
          );
        })
      : null;
  }, [layouts]);

  return (
    <ResponsiveGridLayout
      className="vwb-renderer min-h-[100px] border-dashed border-1 border-[var(--vwb-primary-color)] bg-white"
      breakpoints={{ lg: 768, md: 375, sm: 0 }}
      layouts={{ lg: layouts }}
      cols={{ lg: 12, md: 6, sm: 2 }}
      isDroppable
      // WidthProvider option
      measureBeforeMount={false}
      // 防碰撞
      preventCollision
      droppingItem={{ i: 'dragElement', w: 4, h: 2 }}
      // 处理待放置的项
      onDrop={(layout: unknown, layoutItem: VWBLayout) => onDrop(layout, layoutItem)}
    >
      {renderWidgets}
    </ResponsiveGridLayout>
  );
}
