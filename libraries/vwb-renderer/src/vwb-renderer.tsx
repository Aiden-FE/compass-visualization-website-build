import { Responsive, WidthProvider } from 'react-grid-layout';
import { useMemo } from 'react';
import { VWBLayoutItem, VWBApplication } from '@compass-aiden/vwb-core';
import VWBWidget from '@/components/vwb-widget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export interface IVWBRendererProps {
  appConfig: VWBApplication;
  className?: string;
  droppingItem?: { i: string; w: number; h: number };
  onDrop?: (layoutItem: VWBLayoutItem) => void;
}

export default function VWBRenderer({
  className,
  appConfig,
  onDrop,
  droppingItem = { i: 'dragElement', w: 4, h: 2 },
}: IVWBRendererProps) {
  /**
   * @desc 根据布局生成布局组件
   * @param layout
   */
  const renderWidgets = useMemo(() => {
    return appConfig.selectedPage?.layouts?.length
      ? appConfig.selectedPage.layouts.map((layout) => {
          return (
            <div className="vwb-grid-layout__item overflow-auto" key={layout.i}>
              <VWBWidget layout={layout} />
            </div>
          );
        })
      : null;
  }, [appConfig.selectedPage]);

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  return appConfig.selectedPage ? (
    <ResponsiveGridLayout
      className={`vwb-renderer min-h-[100px] bg-white ${className || ''}`}
      breakpoints={{ lg: 768, md: 375, sm: 0 }}
      layouts={{
        lg: appConfig.selectedPage.layouts,
        md: appConfig.selectedPage.layouts,
        sm: appConfig.selectedPage.layouts,
        xs: appConfig.selectedPage.layouts,
      }}
      cols={{ lg: 12, md: 6, sm: 2 }}
      isDroppable
      // WidthProvider option
      measureBeforeMount={false}
      // 防碰撞
      preventCollision
      droppingItem={droppingItem}
      // 处理待放置的项
      onDrop={(_: unknown, layoutItem: VWBLayoutItem) => onDrop?.(layoutItem)}
    >
      {renderWidgets}
    </ResponsiveGridLayout>
  ) : null;
}
