import { JSX } from 'react';

const ComponentsRegistry = new Map<string, () => JSX.Element>();

export function registerComponent(componentName: string, component: () => React.JSX.Element) {
  if (!ComponentsRegistry.has(componentName)) {
    ComponentsRegistry.set(componentName, component);
  }
  return true;
}

export function removeComponent(componentName: string) {
  ComponentsRegistry.delete(componentName);
}

export function clearComponents() {
  ComponentsRegistry.clear();
}

export function getComponentByName(componentName: string) {
  return ComponentsRegistry.get(componentName);
}
