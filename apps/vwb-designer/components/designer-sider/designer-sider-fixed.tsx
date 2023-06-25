import DesignerSiderMenus from '@/components/designer-sider/designer-sider-menus';
import DesignerSiderMaterials from '@/components/designer-sider/designer-sider-materials';
import { AppSystemComponent } from '@/components/common';
import styles from './index.module.scss';

export interface IDesignerSiderFixedProps {
  onToggleSiderMode?: () => void;
}

const DesignerSiderFixed: React.FC<IDesignerSiderFixedProps> = () => (
  <div className={styles['vwb-designer-sider__fixed']}>
    <div className={styles['vwb-designer-sider__menus']}>
      <DesignerSiderMenus />
    </div>
    <div>
      <AppSystemComponent
        umdUrl="/3rd/vwb-atomic-text.umd.js"
        attrs={{
          text: 'test',
        }}
      />
      <DesignerSiderMaterials />
    </div>
  </div>
);

export default DesignerSiderFixed;
