import { nanoid } from 'nanoid';

// eslint-disable-next-line import/prefer-default-export
export class LayoutItem {
  /** 布局项id */
  i: string = nanoid();

  /** 所在x坐标 */
  x: number;

  /** 所在y坐标 */
  y: number;

  /** 宽度所占列 */
  w = 2;

  /** 高度所占行 */
  h = 2;

  constructor(data: Partial<LayoutItem> & { x: number; y: number }) {
    this.x = data.x;
    this.y = data.y;
    if (typeof data.i !== 'undefined') this.i = data.i;
    if (typeof data.w !== 'undefined') this.w = data.w;
    if (typeof data.h !== 'undefined') this.h = data.h;
  }
}
