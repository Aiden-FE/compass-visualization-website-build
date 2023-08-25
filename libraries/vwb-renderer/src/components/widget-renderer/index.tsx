import { VWBLayoutItem, VWBWidget } from '@compass-aiden/vwb-core';
import useComponent from '@/hooks/use-component';

export interface VWBWidgetRendererProps {
  layoutItem: VWBLayoutItem;
  widget: VWBWidget;
}

export default function VWBWidgetRenderer({ widget }: VWBWidgetRendererProps) {
  const { Component } = useComponent(widget.material);
  return Component && <Component {...widget.props} />;
}
