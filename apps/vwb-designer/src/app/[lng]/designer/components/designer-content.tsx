import { useState, useEffect } from 'react';
import { DesignerCentralScheduler, VWBConfiguration, VWBLayout } from '@compass-aiden/vwb-core';
import { CommonComponentProps } from '@/interfaces';
import VWBRenderer from '@compass-aiden/vwb-renderer';
import '@compass-aiden/vwb-renderer/dist/style.css';
import { useAppSelector } from '@/stores';
import styles from './designer-content.module.scss';

function DesignerContent({ centralScheduler }: CommonComponentProps<{ centralScheduler: DesignerCentralScheduler }>) {
  const [configuration, setConfiguration] = useState<VWBConfiguration>(new VWBConfiguration());
  const defaultCreateLayoutItem = useAppSelector((state) => state.designer.defaultCreateLayoutItem);

  useEffect(() => {
    const sub = centralScheduler.configurationObservable.subscribe((config) => {
      setConfiguration(config);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [centralScheduler]);

  function onDrop(layoutItem: VWBLayout) {
    centralScheduler.updateConfiguration({
      configuration: {
        layouts: configuration.configuration.layouts.concat([new VWBLayout({ ...layoutItem, i: undefined })]),
      },
    });
  }

  return (
    <div
      className={`overflow-auto bg-[#f5f5f5] ${styles[`vwb-designer-content_${configuration.configuration.platform}`]}`}
    >
      <VWBRenderer
        centralScheduler={centralScheduler}
        onDrop={(item) => onDrop(item)}
        droppingItem={defaultCreateLayoutItem}
        className="border-dashed border-1 border-[var(--vwb-primary-color)]"
      />
    </div>
  );
}

export default DesignerContent;
