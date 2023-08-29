import { JSX } from 'react';
import { registerComponent } from '@compass-aiden/vwb-renderer';
import Text from './text';

export default function InstallMaterials() {
  registerComponent('Text', () => Text as unknown as JSX.Element);
}
