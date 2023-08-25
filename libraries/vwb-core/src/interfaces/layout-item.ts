import { nanoid } from 'nanoid';
import merge from 'lodash-es/merge';

/** 页面布局项 */
export default class VWBLayoutItem {
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

  constructor(data: Partial<VWBLayoutItem> & { x: number; y: number }) {
    merge(this, data);
    this.x = data.x;
    this.y = data.y;
  }
}
