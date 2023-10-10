import AppEmpty from '@/components/app-empty';
import { CommonComponentProps } from '@/interfaces';

function DesignerSettings({ lang }: CommonComponentProps) {
  return (
    <div className="w-[350px] bg-white flex-none">
      <AppEmpty lang={lang} />
    </div>
  );
}

export default DesignerSettings;
