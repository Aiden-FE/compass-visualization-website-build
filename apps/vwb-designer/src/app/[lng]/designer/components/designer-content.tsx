import { VWBApplication, VWBLayoutItem, VWBPage } from '@compass-aiden/vwb-core';
import { CommonComponentProps } from '@/interfaces';
import VWBRenderer from '@compass-aiden/vwb-renderer';
import '@compass-aiden/vwb-renderer/dist/style.css';
import { useAppSelector } from '@/stores';
import styles from './designer-content.module.scss';

interface DesignerContentProps {
  appConfig: VWBApplication;
  onUpdatePage: (pageConfig: Partial<VWBPage>) => void;
}

function DesignerContent({ appConfig, onUpdatePage }: CommonComponentProps<DesignerContentProps>) {
  const defaultCreateLayoutItem = useAppSelector((state) => state.designer.defaultCreateLayoutItem);

  function onDrop(layoutItem: VWBLayoutItem) {
    const layouts = appConfig.selectedPage?.layouts || [];
    onUpdatePage({
      layouts: layouts.concat([new VWBLayoutItem({ ...layoutItem, i: undefined })]),
    });
  }

  return (
    <div className={`overflow-auto bg-[#f5f5f5] ${styles[`vwb-designer-content_${appConfig.platform}`]}`}>
      <VWBRenderer
        appConfig={appConfig}
        onDrop={(item) => onDrop(item)}
        droppingItem={defaultCreateLayoutItem}
        className="border-dashed border-1 border-[var(--vwb-primary-color)]"
      />
    </div>
  );
}

export default DesignerContent;
