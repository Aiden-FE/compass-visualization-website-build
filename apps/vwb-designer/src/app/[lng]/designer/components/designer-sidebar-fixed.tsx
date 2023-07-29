import { CommonComponentProps } from '@/interfaces';
import styles from './designer-sidebar.module.scss';
import DesignerSidebarMenus from './designer-sidebar-menus';
import DesignerSidebarMaterials from './designer-sidebar-materials';

function DesignerSidebarFixed(params: CommonComponentProps) {
  return (
    <div className={styles['vwb-designer-sidebar__fixed']}>
      <div className={styles['vwb-designer-sidebar__menus']}>
        <DesignerSidebarMenus />
      </div>
      <div>
        Display materials
        <DesignerSidebarMaterials />
      </div>
    </div>
  );
}

export default DesignerSidebarFixed;
