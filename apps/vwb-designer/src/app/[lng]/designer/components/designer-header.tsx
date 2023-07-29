import { useEffect, useState } from 'react';
import { DesignerCentralScheduler, IDesignerCentralSchedulerState, VWBConfiguration } from '@compass-aiden/vwb-core';
import { Button, Space, Tooltip } from 'antd';
import AppIcon from '@/components/app-icon/app-icon';
import { AvailableLanguagesNS, useClientTranslation } from '@/i18n';
import { CommonComponentProps } from '@/interfaces';

export interface IDesignerHeaderProps {
  centralScheduler: DesignerCentralScheduler;
  onSubmit?: (configuration: VWBConfiguration) => void;
}

const DesignerHeader: CommonComponentProps<IDesignerHeaderProps> = ({ centralScheduler, onSubmit, lang }) => {
  const { t } = useClientTranslation(lang, AvailableLanguagesNS.DESIGNER);
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
        <Tooltip title={t('Undo')}>
          <Button
            disabled={!actionStatus.isAllowUndo}
            onClick={() => centralScheduler.undo()}
            icon={<AppIcon className="text-[24px]" icon="mdi:undo-variant" />}
            type="text"
          />
        </Tooltip>

        <Tooltip title={t('Redo')}>
          <Button
            disabled={!actionStatus.isAllowRedo}
            onClick={() => centralScheduler.redo()}
            icon={<AppIcon className="text-[24px]" icon="mdi:redo-variant" />}
            type="text"
          />
        </Tooltip>
      </Space>
      <div className="flex-1 flex justify-center">
        <Tooltip title={t('Desktop side')}>
          <div
            onClick={() => togglePlatform('pc')}
            onKeyDown={() => togglePlatform('pc')}
            role="button"
            tabIndex={0}
            className={`p-1.5 cursor-pointer ${
              configuration.platform === 'pc' ? 'bg-slate-100 text-[var(--vwb-primary-color)]' : ''
            }`}
          >
            <AppIcon className="text-[24px]" icon="mdi:laptop" />
          </div>
        </Tooltip>
        <Tooltip title={t('Tablet side')}>
          <div
            onClick={() => togglePlatform('tablet')}
            onKeyDown={() => togglePlatform('tablet')}
            role="button"
            tabIndex={0}
            className={`p-1.5 cursor-pointer ${
              configuration.platform === 'tablet' ? 'bg-slate-100 text-[var(--vwb-primary-color)]' : ''
            }`}
          >
            <AppIcon className="text-[24px]" icon="ant-design:tablet-outlined" />
          </div>
        </Tooltip>
        <Tooltip title={t('Mobile side')}>
          <div
            onClick={() => togglePlatform('mobile')}
            onKeyDown={() => togglePlatform('mobile')}
            role="button"
            tabIndex={0}
            className={`p-1.5 cursor-pointer ${
              configuration.platform === 'mobile' ? 'bg-slate-100 text-[var(--vwb-primary-color)]' : ''
            }`}
          >
            <AppIcon className="text-[24px]" icon="mdi:cellphone" />
          </div>
        </Tooltip>
      </div>
      <Space>
        <Button onClick={() => save()} type="primary">
          {t('Save')}
        </Button>
      </Space>
    </>
  );
};

export default DesignerHeader;
