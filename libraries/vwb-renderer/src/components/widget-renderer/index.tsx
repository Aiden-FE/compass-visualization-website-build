import { VWBWidget } from '@compass-aiden/vwb-core';
import useComponent from '@/hooks/use-component';
import { useContext, MouseEvent } from 'react';
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

  function onSelectWidget(e: MouseEvent) {
    e.stopPropagation();
    onSelect?.({
      config: widgetConfig,
      ref: containerRef.current,
      event: e,
    });
  }

  return (
    <div
      ref={containerRef}
      data-widget-id={widgetConfig.id}
      className={`vwb-wr w-full h-full vwb-wr__material_${widgetConfig.material.componentName}`}
      onClick={appContext.appConfig.mode === 'editable' ? (e) => onSelectWidget(e) : undefined}
    >
      {/* @ts-ignore */}
      {Component && <Component widget={widgetConfig} />}
    </div>
  );
}
