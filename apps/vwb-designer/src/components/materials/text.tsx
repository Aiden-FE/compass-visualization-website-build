import { DeepPartial, VWBWidget, VWBWidgetConfiguration } from '@compass-aiden/vwb-core';
import merge from 'lodash-es/merge';

export class VWBTextWidgetConfiguration extends VWBWidgetConfiguration<{ value: string }> {
  constructor(config?: DeepPartial<VWBTextWidgetConfiguration>) {
    super();
    merge(this, config);
  }
}

interface TextProps {
  widget?: VWBWidget<VWBTextWidgetConfiguration>;
}

export default function Text({ widget }: TextProps) {
  return (
    <>
      This is Text material component.
      {widget?.configuration.data.value}
    </>
  );
}
