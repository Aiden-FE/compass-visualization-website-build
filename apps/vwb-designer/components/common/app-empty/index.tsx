import React from 'react';
import IconEmpty from '@/assets/svgs/empty.svg';
import { useTranslation } from 'next-i18next';
import { I18nNamespaces } from '@/config';

export interface IAppEmptyProps {
  text?: string;
  icon?: React.ReactNode;
  iconSize?: string;
  layout?: 'center';
}

const AppEmpty: React.FC<IAppEmptyProps> = ({ icon, iconSize, text, layout }) => {
  const { t } = useTranslation(I18nNamespaces.COMMON);
  return (
    <div className={`vwb-empty-${layout || 'default'} text-center`}>
      <div className="pt-12">
        <div
          className="leading-none"
          style={{
            fontSize: iconSize || '68px',
          }}
        >
          {icon || <IconEmpty />}
        </div>
        <p className="m-0 text-xs text-slate-400">{text || t('noData')}</p>
      </div>
    </div>
  );
};

export default AppEmpty;
