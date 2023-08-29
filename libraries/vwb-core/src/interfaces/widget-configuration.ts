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
}
