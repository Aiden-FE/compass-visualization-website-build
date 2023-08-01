import { Card } from 'antd';

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'center',
};

function DesignerSidebarMaterials() {
  return (
    <Card title="Card Title">
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  );
}

export default DesignerSidebarMaterials;
