import { VWBApplication, VWBWidget, widgetValidate } from '@compass-aiden/vwb-core';
import { MouseEvent, useEffect } from 'react';
import useComponent from '@/hooks/use-component';

export interface VWBWidgetRendererProps {
  widgetConfig: VWBWidget;
  mode?: VWBApplication['mode'];
  /** 当组件被选中时触发,仅编辑态有效 */
  onSelect?: (params: { config: VWBWidget; ref: HTMLDivElement | null; event: MouseEvent }) => void;
}

export default function VWBWidgetRenderer({ widgetConfig, onSelect, mode = 'preview' }: VWBWidgetRendererProps) {
  const { Component } = useComponent(widgetConfig.material);
  const containerRef = useRef<HTMLDivElement>(null);
  const isEditable = useMemo(() => mode === 'editable', [mode]);

  useEffect(() => {
    if (!widgetValidate(widgetConfig)) {
      throw new Error('The acquired widget data is not the expected data.');
    }
  }, [widgetConfig]);

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
