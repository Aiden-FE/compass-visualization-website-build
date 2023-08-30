import merge from 'lodash-es/merge';
import { nanoid } from 'nanoid';
import VWBLayoutItem from '@/interfaces/layout-item';
import VWBWidget from '@/interfaces/widget';

export default class VWBPage {
  /** 布局信息 */
  layouts: VWBLayoutItem[] = [];

  /** 页面id */
  id = nanoid();

  /** 组件列表 */
  widgets: VWBWidget[] = [];

  type = 'page' as const;

  /** 页面布局断点 */
  // breakpoints: { [P: string]: number } = { lg: 768, md: 375, sm: 0 };

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
