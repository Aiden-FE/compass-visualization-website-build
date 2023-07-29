import { useState } from 'react';
import DesignerSiderFixed from './designer-sider-fixed';
import DesignerSiderSmall from './designer-sider-small';

export interface IDesignerMaterialProps {}

const DesignerMaterial: React.FC<IDesignerMaterialProps> = () => {
  const [siderMode, setSiderMode] = useState<'fixed' | 'small'>('fixed');

  function toggleSider() {
    setSiderMode(siderMode === 'fixed' ? 'small' : 'fixed');
  }

  return siderMode === 'fixed' ? (
    <DesignerSiderFixed onToggleSiderMode={() => toggleSider()} />
  ) : (
    <DesignerSiderSmall onToggleSiderMode={() => toggleSider()} />
  );
};

export default DesignerMaterial;
