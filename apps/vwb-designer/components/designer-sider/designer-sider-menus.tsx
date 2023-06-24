import IconComponent from '@/assets/svgs/component.svg';
import { Button, Tooltip } from 'antd';

export interface IDesignerSiderMenusProps {}

const DesignerSiderMenus: React.FC<IDesignerSiderMenusProps> = () => (
  <div className="flex flex-col items-center py-4">
    <Tooltip title="组件库" placement="right">
      <Button icon={<IconComponent className="text-xl" />} type="text" />
    </Tooltip>
  </div>
);

export default DesignerSiderMenus;
