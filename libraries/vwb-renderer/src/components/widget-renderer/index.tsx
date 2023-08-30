import { VWBWidget } from '@compass-aiden/vwb-core';
import { useContext, MouseEvent } from 'react';
import useComponent from '@/hooks/use-component';
import { AppContext } from '@/hooks';

export interface VWBWidgetRendererProps {
  widgetConfig: VWBWidget;
  /** 当组件被选中时触发,仅编辑态有效 */
  onSelect?: (params: { config: VWBWidget; ref: HTMLDivElement | null; event: MouseEvent }) => void;
}

export default function VWBWidgetRenderer({ widgetConfig, onSelect }: VWBWidgetRendererProps) {
  const { Component } = useComponent(widgetConfig.material);
  const appContext = useContext(AppContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const isEditable = useMemo(() => appContext.appConfig.mode === 'editable', [appContext.appConfig]);

  function onSelectWidget(e: MouseEvent) {
    e.stopPropagation();
    onSelect?.({
      config: widgetConfig,
      ref: containerRef.current,
      event: e,
    });
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      data-widget-id={widgetConfig.id}
      className={`vwb-wr w-full h-full vwb-wr__material_${widgetConfig.material.componentName}`}
      onClick={isEditable ? (e) => onSelectWidget(e) : undefined}
    >
      {/* @ts-ignore */}
      {Component && <Component widget={widgetConfig} />}
    </div>
  );
}
