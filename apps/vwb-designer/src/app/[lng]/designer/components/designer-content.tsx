import { VWBApplication, VWBLayoutItem, VWBPage, VWBWidget } from '@compass-aiden/vwb-core';
import { CommonComponentProps } from '@/interfaces';
import { VWBAppRenderer } from '@compass-aiden/vwb-renderer';
import '@compass-aiden/vwb-renderer/dist/style.css';
import { useAppSelector } from '@/stores';
import styles from './designer-content.module.scss';

interface DesignerContentProps {
  appConfig: VWBApplication;
  onUpdatePage: (pageConfig: Partial<VWBPage>) => void;
}

function DesignerContent({ appConfig, onUpdatePage }: CommonComponentProps<DesignerContentProps>) {
  const defaultCreateLayoutItem = useAppSelector((state) => state.designer.defaultCreateLayoutItem);

  function onDrop(item: VWBLayoutItem) {
    const page = appConfig.pages.find((page) => page.id === appConfig.selectedPageId);
    const layouts = page?.layouts || [];
    const layoutItem = new VWBLayoutItem({ ...item, i: undefined });
    const widget = new VWBWidget({
      id: layoutItem.i,
      material: {
        componentName: 'text',
        from: 'local',
        type: 'react-component',
      },
    });
    onUpdatePage({
      layouts: layouts.concat([layoutItem]),
      widgets: (page?.widgets || []).concat(widget),
    });
  }

  return (
    <div className={`overflow-auto bg-[#f5f5f5] ${styles[`vwb-designer-content_${appConfig.platform}`]}`}>
      {/* className="" */}
      <VWBAppRenderer
        appConfig={appConfig}
        pageProps={{
          droppingItem: defaultCreateLayoutItem,
          onDrop: (item) => onDrop(item),
          className: 'min-h-full bg-white border-dashed border-1 border-[var(--vwb-primary-color)]',
        }}
      />
    </div>
  );
}

export default DesignerContent;
