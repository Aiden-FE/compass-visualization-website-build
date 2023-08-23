import { VWBLayoutItem } from '@compass-aiden/vwb-core';

function VWBWidget({ layout }: { layout: VWBLayoutItem }) {
  return (
    <div className="vwb-widget-renderer overflow-auto absolute w-full h-full bg-amber-300">
      <h3>Widget</h3>
      This is widget component.
      {layout.i}
    </div>
  );
}

export default VWBWidget;
