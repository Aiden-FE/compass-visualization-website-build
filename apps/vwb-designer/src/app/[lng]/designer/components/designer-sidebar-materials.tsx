import { Card } from 'antd';
import { designerActions, useAppDispatch } from '@/stores';
import { CSSProperties, DragEvent } from 'react';
import { Materials } from '@/config';
import { CommonComponentProps, MaterialConfig } from '@/interfaces';
import { AvailableLanguagesNS, useClientTranslation } from '@/i18n';

const gridStyle: CSSProperties = {
  width: '50%',
  textAlign: 'center',
};

function DesignerSidebarMaterials({ lang }: CommonComponentProps) {
  const { t } = useClientTranslation(lang, AvailableLanguagesNS.MATERIALS);
  const dispatch = useAppDispatch();

  function onDragStart(e: DragEvent<HTMLDivElement>, item: MaterialConfig) {
    e.dataTransfer?.setData('text/plain', '');
    dispatch(designerActions.updateDefaultLayoutItem(item));
  }

  return (
    <>
      <Card title="基础组件">
        {Materials.map((item) => (
          <Card.Grid
            className="cursor-pointer"
            draggable
            unselectable="on"
            onDragStart={(e) => onDragStart(e, item)}
            key={item.material.componentName}
            style={gridStyle}
          >
            {t(item.material.componentName)}
          </Card.Grid>
        ))}
      </Card>
      <p className="text-center text-gray-500 text-[12px]">拖动组件到中间布局区域</p>
    </>
  );
}

export default DesignerSidebarMaterials;
