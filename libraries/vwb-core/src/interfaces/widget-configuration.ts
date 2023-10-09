import merge from 'lodash-es/merge';
import { DeepPartial } from '@/interfaces/common';

export default class VWBWidgetConfiguration<
  Data extends object = {},
  Attributes extends object = {},
  Styles extends object = {},
> {
  /** 数据配置 */
  data: Data = {} as Data;

  /** 属性数据 */
  attributes: Attributes = {} as Attributes;

  /** 样式数据 */
  styles: Styles = {} as Styles;

  constructor(widgetConfig?: DeepPartial<VWBWidgetConfiguration>) {
    if (widgetConfig) {
      merge(this, widgetConfig);
    }
  }

  /** 合并配置项 */
  static merge(...settings: DeepPartial<VWBWidgetConfiguration>[]): VWBWidgetConfiguration {
    const newSetting = new VWBWidgetConfiguration();

    return merge(newSetting, ...settings);
  }
}
