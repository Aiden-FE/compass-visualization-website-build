import { useState } from 'react';
import { CommonComponentProps } from '@/interfaces';
import DesignerSidebarFixed from './designer-sidebar-fixed';
import DesignerSidebarFloat from './designer-sidebar-float';

function DesignerSidebar({ lang }: CommonComponentProps) {
  const [sidebarMode, setSidebarMode] = useState<'fixed' | 'float'>('fixed');

  function toggleSidebar() {
    setSidebarMode(sidebarMode === 'fixed' ? 'float' : 'float');
  }

  return sidebarMode === 'fixed' ? (
    <DesignerSidebarFixed lang={lang} onToggleSiderMode={() => toggleSidebar()} />
  ) : (
    <DesignerSidebarFloat lang={lang} onToggleSiderMode={() => toggleSidebar()} />
  );
}

export default DesignerSidebar;
