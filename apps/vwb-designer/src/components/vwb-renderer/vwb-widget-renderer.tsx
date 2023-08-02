import { ForwardedRef, forwardRef } from 'react';
import { CommonComponentProps } from '@/interfaces';
import { LayoutItem } from './interfaces';

// eslint-disable-next-line react/display-name
const VWBWidgetRenderer = forwardRef(
  ({ layout }: CommonComponentProps<{ layout: LayoutItem }>, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="bg-amber-300 overflow-auto inline-block">
        <h3>Widget</h3>
        This is widget component.
        {layout.i}
      </div>
    );
  },
);

export default VWBWidgetRenderer;
