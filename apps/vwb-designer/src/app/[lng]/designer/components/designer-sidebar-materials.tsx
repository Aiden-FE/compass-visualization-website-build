import { Card } from 'antd';
import { designerActions, useAppDispatch } from '@/stores';
import { CSSProperties, DragEvent } from 'react';

const gridStyle: CSSProperties = {
  width: '50%',
  textAlign: 'center',
};

function DesignerSidebarMaterials() {
  const dispatch = useAppDispatch();

  function onDragStart(e: DragEvent<HTMLDivElement>, item: { w: number; h: number }) {
    e.dataTransfer?.setData('text/plain', '');
    dispatch(designerActions.updateDefaultLayoutItem(item));
  }

  return (
    <>
      <Card title="基础组件">
        <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 1 })} style={gridStyle}>
          组件1
        </Card.Grid>
        <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 1 })} style={gridStyle}>
          组件1
        </Card.Grid>
        <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 1 })} style={gridStyle}>
          组件1
        </Card.Grid>
        <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 2 })} style={gridStyle}>
          组件2
        </Card.Grid>
        <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 2 })} style={gridStyle}>
          组件2
        </Card.Grid>
        <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 2 })} style={gridStyle}>
          组件2
        </Card.Grid>
      </Card>
      <p className="text-center text-gray-500 text-[12px]">拖动组件到中间布局区域</p>
    </>
  );
}

export default DesignerSidebarMaterials;
