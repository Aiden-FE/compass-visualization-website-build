// eslint-disable-next-line max-classes-per-file
import merge from 'lodash-es/merge';
import { nanoid } from 'nanoid';

export class VWBLayout {
  /** 布局项id */
  i = nanoid();

  /** 所在x坐标 */
  x: number;

  /** 所在y坐标 */
  y: number;

  /** 宽度所占列 */
  w = 2;

  /** 高度所占行 */
  h = 2;

  constructor(data: Partial<VWBLayout> & { x: number; y: number }) {
    this.x = data.x;
    this.y = data.y;
    if (typeof data.i !== 'undefined') this.i = data.i;
    if (typeof data.w !== 'undefined') this.w = data.w;
    if (typeof data.h !== 'undefined') this.h = data.h;
  }
}

export class VWBGlobalConfiguration {
  /** 布局信息 */
  layouts: VWBLayout[] = [];

  /** 目标平台 */
  platform?: 'pc' | 'tablet' | 'mobile' = 'pc';

  /** 语言 */
  language?: string = 'zh-CN';
}

export default class VWBConfiguration {
  /**
   * @description 模式
   *
   * - 'preview' 仅预览
   * - 'editable' 可编辑
   */
  mode: 'preview' | 'editable' = 'editable';

  /** 全局配置项 */
  configuration = new VWBGlobalConfiguration();

  /** 合并配置项 */
  static merge(...settings: Partial<VWBConfiguration>[]): VWBConfiguration {
    const newSetting = new VWBConfiguration();

    return merge(newSetting, ...settings);
  }
}
