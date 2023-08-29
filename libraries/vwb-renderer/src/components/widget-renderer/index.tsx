import { VWBWidget } from '@compass-aiden/vwb-core';
import useComponent from '@/hooks/use-component';

export interface VWBWidgetRendererProps {
  widgetConfig: VWBWidget;
}

export default function VWBWidgetRenderer({ widgetConfig }: VWBWidgetRendererProps) {
  const { Component } = useComponent(widgetConfig.material);
  // @ts-ignore
  return Component && <Component widget={widgetConfig} />;
}
