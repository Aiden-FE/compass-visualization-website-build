import { useEffect, useState } from 'react';
import { VWBConfiguration } from '@/pages/designer/core';
import { Button, Space, Tooltip } from 'antd';
import DesignerCentralScheduler from '@/pages/designer/designer-central-scheduler';
import { IDesignerCentralSchedulerState } from '@/pages/designer/interfaces';
import { I18nNamespaces } from '@/config';
import { useTranslation } from 'next-i18next';

export interface IDesignerHeaderProps {
  centralScheduler: DesignerCentralScheduler;
  onSubmit?: (configuration: VWBConfiguration) => void;
}

const DesignerHeader: React.FC<IDesignerHeaderProps> = ({ centralScheduler, onSubmit }) => {
  const { t } = useTranslation([I18nNamespaces.DESIGNER, I18nNamespaces.COMMON]);
  const [configuration, setConfiguration] = useState<VWBConfiguration>(new VWBConfiguration());

  const [actionStatus, setActionStatus] = useState<IDesignerCentralSchedulerState>({
    isAllowUndo: false,
    isAllowRedo: false,
  });

  function togglePlatform(platform: VWBConfiguration['platform']) {
    if (platform === configuration.platform) {
      return;
    }
    centralScheduler.updateConfiguration({
      platform,
    });
  }

  function save() {
    onSubmit?.(configuration);
  }

  useEffect(() => {
    const sub = centralScheduler.configurationObservable.subscribe((config) => {
      setConfiguration(config);
    });
    const sub2 = centralScheduler.actionStatusObservable.subscribe((status) => {
      setActionStatus(status);
    });

    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
    };
  }, [centralScheduler]);

  return (
    <>
      <Space>
        <Tooltip title={t('actions.undo')}>
          <Button
            disabled={!actionStatus.isAllowUndo}
            onClick={() => centralScheduler.undo()}
            icon={<span className="icon-[mdi--undo-variant] text-[24px]" />}
            type="text"
          />
        </Tooltip>

        <Tooltip title={t('actions.redo')}>
          <Button
            disabled={!actionStatus.isAllowRedo}
            onClick={() => centralScheduler.redo()}
            icon={<span className="icon-[mdi--redo-variant] text-[24px]" />}
            type="text"
          />
        </Tooltip>
      </Space>
      <div className="flex-1 flex justify-center">
        <Tooltip title={t('actions.computer')}>
          <div
            onClick={() => togglePlatform('pc')}
            onKeyDown={() => togglePlatform('pc')}
            role="button"
            tabIndex={0}
            className={`p-1.5 cursor-pointer ${configuration.platform === 'pc' ? 'bg-slate-100' : ''}`}
          >
            <span className="icon-[mdi--laptop] text-[24px]" />
          </div>
        </Tooltip>
        <Tooltip title={t('actions.tablet')}>
          <div
            onClick={() => togglePlatform('tablet')}
            onKeyDown={() => togglePlatform('tablet')}
            role="button"
            tabIndex={0}
            className={`p-1.5 cursor-pointer ${configuration.platform === 'tablet' ? 'bg-slate-100' : ''}`}
          >
            <span className="icon-[ant-design--tablet-outlined] text-[24px]" />
          </div>
        </Tooltip>
        <Tooltip title={t('actions.mobile')}>
          <div
            onClick={() => togglePlatform('mobile')}
            onKeyDown={() => togglePlatform('mobile')}
            role="button"
            tabIndex={0}
            className={`p-1.5 cursor-pointer ${configuration.platform === 'mobile' ? 'bg-slate-100' : ''}`}
          >
            <span className="icon-[mdi--cellphone] text-[24px]" />
          </div>
        </Tooltip>
      </div>
      <Space>
        <Button onClick={save} type="primary">
          {t('save', { ns: I18nNamespaces.COMMON })}
        </Button>
      </Space>
    </>
  );
};

export default DesignerHeader;
