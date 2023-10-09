import { VWBApplication, VWBLayoutItem, VWBPage, VWBWidget } from '@compass-aiden/vwb-core';
import { CommonComponentProps } from '@/interfaces';
import { VWBAppRenderer, VWBAppRendererRef } from '@compass-aiden/vwb-renderer';
import '@compass-aiden/vwb-renderer/dist/style.css';
import { useAppSelector } from '@/stores';
import { useRef } from 'react';
import styles from './designer-content.module.scss';

interface DesignerContentProps {
  appConfig: VWBApplication;
  selectedPageId?: string;
  setSelectPageId?: (id?: string) => void;
  onUpdatePage: (pageConfig: Partial<VWBPage>) => void;
}

function DesignerContent({
  appConfig,
  onUpdatePage,
  selectedPageId,
  setSelectPageId,
}: CommonComponentProps<DesignerContentProps>) {
  const defaultCreateLayoutItem = useAppSelector((state) => state.designer.defaultCreateLayoutItem);
  const appRendererRef = useRef<VWBAppRendererRef>(null);

  function onDrop(item: VWBLayoutItem) {
    if (!appRendererRef.current) {
      throw new Error('Not found instance of app renderer.');
    }
    const page = appRendererRef.current.getCurrentPageConfig();
    const layouts = page?.layouts || [];
    const layoutItem = new VWBLayoutItem({ ...item, i: undefined });

    const widget = new VWBWidget({
      id: layoutItem.i,
      material: defaultCreateLayoutItem.material,
      configuration: defaultCreateLayoutItem.getDefaultConfig({ data: { value: 'Hello world' } }),
    });
    onUpdatePage({
      layouts: layouts.concat([layoutItem]),
      widgets: (page?.widgets || []).concat(widget),
    });
  }

  function onSelected(params: unknown) {
    // eslint-disable-next-line no-console
    console.log('Selected: ', params);
  }

  return (
    <div className={`overflow-auto bg-[#f5f5f5] ${styles[`vwb-designer-content_${appConfig.platform}`]}`}>
      <VWBAppRenderer
        ref={appRendererRef}
        appConfig={appConfig}
        selectedPageId={selectedPageId}
        setSelectPageId={setSelectPageId}
        pageProps={{
          droppingItem: defaultCreateLayoutItem?.layout,
          onDrop: (item) => onDrop(item),
          className: 'min-h-full bg-white border-dashed border-1 border-[var(--vwb-primary-color)]',
          onSelect: onSelected,
        }}
      />
    </div>
  );
}

export default DesignerContent;
