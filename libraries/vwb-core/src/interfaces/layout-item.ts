import { nanoid } from 'nanoid';

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
    this.x = data.x;
    this.y = data.y;
    if (data.i !== undefined) this.i = data.i;
    if (data.w !== undefined) this.w = data.w;
    if (data.h !== undefined) this.h = data.h;
  }
}
