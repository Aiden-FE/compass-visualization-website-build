import { AppEmpty } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { I18nNamespaces } from '@/config';

export interface IDesignerMaterialSettingProps {}

const DesignerMaterialSetting: React.FC<IDesignerMaterialSettingProps> = () => {
  const { t } = useTranslation(I18nNamespaces.DESIGNER);

  return (
    <div className="w-[350px] bg-white flex-none">
      <AppEmpty text={t('prompt.noSelectNode')} />
    </div>
  );
};

export default DesignerMaterialSetting;
