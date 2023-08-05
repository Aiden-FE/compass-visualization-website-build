import { useState, useEffect } from 'react';
import { DesignerCentralScheduler, VWBConfiguration } from '@compass-aiden/vwb-core';
import { CommonComponentProps } from '@/interfaces';
import VWBRenderer from '@compass-aiden/vwb-renderer';
import styles from './designer-content.module.scss';
import '@compass-aiden/vwb-renderer/dist/style.css';

function DesignerContent({ centralScheduler }: CommonComponentProps<{ centralScheduler: DesignerCentralScheduler }>) {
  const [configuration, setConfiguration] = useState<VWBConfiguration>(new VWBConfiguration());

  useEffect(() => {
    const sub = centralScheduler.configurationObservable.subscribe((config) => {
      setConfiguration(config);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [centralScheduler]);

  return (
    <div
      className={`overflow-auto bg-[#f5f5f5] ${styles[`vwb-designer-content_${configuration.configuration.platform}`]}`}
    >
      <VWBRenderer className="border-dashed border-1 border-[var(--vwb-primary-color)]" />
    </div>
  );
}

export default DesignerContent;
