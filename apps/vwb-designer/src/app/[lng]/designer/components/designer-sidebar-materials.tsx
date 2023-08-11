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
    <Card title="Card Title">
      <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 1 })} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 1 })} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 1 })} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 2 })} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 2 })} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid draggable unselectable="on" onDragStart={(e) => onDragStart(e, { w: 2, h: 2 })} style={gridStyle}>
        Content
      </Card.Grid>
    </Card>
  );
}

export default DesignerSidebarMaterials;
