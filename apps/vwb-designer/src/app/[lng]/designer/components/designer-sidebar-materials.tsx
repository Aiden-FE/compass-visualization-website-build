import { Card } from 'antd';

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'center',
};

function DesignerSidebarMaterials() {
  return (
    <Card title="Card Title">
      <Card.Grid
        draggable
        unselectable="on"
        onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', '')}
        style={gridStyle}
      >
        Content
      </Card.Grid>
      <Card.Grid
        draggable
        unselectable="on"
        onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', '')}
        style={gridStyle}
      >
        Content
      </Card.Grid>
      <Card.Grid
        draggable
        unselectable="on"
        onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', '')}
        style={gridStyle}
      >
        Content
      </Card.Grid>
      <Card.Grid
        draggable
        unselectable="on"
        onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', '')}
        style={gridStyle}
      >
        Content
      </Card.Grid>
      <Card.Grid
        draggable
        unselectable="on"
        onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', '')}
        style={gridStyle}
      >
        Content
      </Card.Grid>
      <Card.Grid
        draggable
        unselectable="on"
        onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', '')}
        style={gridStyle}
      >
        Content
      </Card.Grid>
    </Card>
  );
}

export default DesignerSidebarMaterials;
