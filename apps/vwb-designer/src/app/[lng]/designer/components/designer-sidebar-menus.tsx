import { Button, Tooltip } from 'antd';
import AppIcon from '@/components/app-icon/app-icon';

function DesignerSidebarMenus() {
  return (
    <div className="flex flex-col items-center py-4">
      <Tooltip title="组件库" placement="right">
        <Button icon={<AppIcon icon="uiw:component" className="text-xl" />} type="text" />
      </Tooltip>
    </div>
  );
}

export default DesignerSidebarMenus;
