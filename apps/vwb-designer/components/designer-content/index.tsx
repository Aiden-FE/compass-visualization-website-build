import DesignerCentralScheduler from '@/pages/designer/designer-central-scheduler';
import { useEffect, useState } from 'react';
import { VWBConfiguration } from '@/pages/designer/core';
import styles from './index.module.scss';

export interface IDesignerContentProps {
  centralScheduler: DesignerCentralScheduler;
}

const DesignerContent: React.FC<IDesignerContentProps> = ({ centralScheduler }) => {
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
    <div className={`overflow-auto bg-[#f5f5f5] ${styles[`vwb-designer-content_${configuration.platform}`]}`}>
      DesignerContent
    </div>
  );
};

export default DesignerContent;
