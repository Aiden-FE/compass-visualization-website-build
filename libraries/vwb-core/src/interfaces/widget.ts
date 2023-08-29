import merge from 'lodash-es/merge';
import { IVWBMaterial } from '@/interfaces/common';
import VWBWidgetConfiguration from '@/interfaces/widget-configuration';

export default class VWBWidget<Config extends VWBWidgetConfiguration = VWBWidgetConfiguration> {
  /** 组件id,等同于layoutItem.i */
  id: string;

  /** 使用的物料 */
  material: IVWBMaterial;

  /** 配置项 */
  configuation: Config = new VWBWidgetConfiguration() as Config;

  constructor(widget: Partial<VWBWidget> & Required<Pick<VWBWidget, 'material' | 'id'>>) {
    merge(this, widget);
    this.material = widget.material;
    this.id = widget.id;
  }
}
