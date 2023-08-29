import { CommonComponentProps } from '@/interfaces';
import styles from './designer-sidebar.module.scss';
import DesignerSidebarMenus from './designer-sidebar-menus';
import DesignerSidebarMaterials from './designer-sidebar-materials';

// eslint-disable-next-line no-empty-pattern
function DesignerSidebarFixed({}: CommonComponentProps<{
  onToggleSidebarMode: () => void;
}>) {
  return (
    <div className={styles['vwb-designer-sidebar__fixed']}>
      <div className={styles['vwb-designer-sidebar__menus']}>
        <DesignerSidebarMenus />
      </div>
      <div>
        <DesignerSidebarMaterials />
      </div>
    </div>
  );
}

export default DesignerSidebarFixed;
