import VWBLayoutItem from '@/interfaces/layout-item';
import merge from 'lodash-es/merge';
import { nanoid } from 'nanoid';

export default class VWBPage {
  /** 布局信息 */
  layouts: VWBLayoutItem[] = [];

  /** 页面id */
  id = nanoid();

  constructor(page?: Partial<VWBPage>) {
    if (page) {
      merge(this, page);
    }
  }

  /** 合并配置项 */
  static merge(...settings: Partial<VWBPage>[]): VWBPage {
    const newSetting = new VWBPage();

    return merge(newSetting, ...settings);
  }
}
