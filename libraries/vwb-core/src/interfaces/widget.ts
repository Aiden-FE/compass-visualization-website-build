import { IVWBMaterial } from '@/interfaces/common';
import merge from 'lodash-es/merge';

export default class VWBWidget {
  /** 组件id,等同于layoutItem.i */
  id: string;

  /** 使用的物料 */
  material: IVWBMaterial;

  /** 透传属性 */
  props: object = {};

  constructor(widget: Partial<VWBWidget> & Required<Pick<VWBWidget, 'material' | 'id'>>) {
    merge(this, widget);
    this.material = widget.material;
    this.id = widget.id;
  }
}
