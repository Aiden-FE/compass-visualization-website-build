import { MaterialConfig } from '@/interfaces';
import { VWBTextWidgetConfiguration } from '@/components/materials/text';
import { DeepPartial } from '@compass-aiden/vwb-core';

const Materials: MaterialConfig[] = [
  {
    material: {
      type: 'react-component',
      from: 'local',
      componentName: 'Text',
    },
    layout: {
      w: 2,
      h: 1,
    },
    getDefaultConfig: (config?: DeepPartial<VWBTextWidgetConfiguration>) => new VWBTextWidgetConfiguration(config),
  },
  {
    material: {
      type: 'react-component',
      from: 'local',
      componentName: 'Text2',
    },
    layout: {
      w: 2,
      h: 1,
    },
    getDefaultConfig: (config?: DeepPartial<VWBTextWidgetConfiguration>) => new VWBTextWidgetConfiguration(config),
  },
  {
    material: {
      type: 'react-component',
      from: 'local',
      componentName: 'Text3',
    },
    layout: {
      w: 2,
      h: 1,
    },
    getDefaultConfig: (config?: DeepPartial<VWBTextWidgetConfiguration>) => new VWBTextWidgetConfiguration(config),
  },
];

export default Materials;
