// FIXME: 请根据实际业务修改组件参数类型
export interface IComponentProps {
  sampleTextProp: string;
}

// FIXME: 请根据实际业务修改组件名称
const ComponentTemplate: React.FC<IComponentProps> = ({ sampleTextProp }) => <div>{sampleTextProp}</div>;

export default ComponentTemplate;
