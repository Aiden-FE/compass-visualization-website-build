import { JSX } from 'react';

const ComponentsRegistry = new Map<string, () => JSX.Element>();

/** 注册renderer可用组件 */
export function registerComponent(componentName: string, component: () => JSX.Element) {
  if (!ComponentsRegistry.has(componentName)) {
    ComponentsRegistry.set(componentName, component);
  }
  return true;
}

/** 取消注册renderer组件 */
export function unregisterComponent(componentName: string) {
  ComponentsRegistry.delete(componentName);
}

/** 清除所有renderer组件 */
export function clearComponents() {
  ComponentsRegistry.clear();
}

/** 根据组件名获取renderer组件 */
export function getComponentByName(componentName: string) {
  return ComponentsRegistry.get(componentName);
}

/** 获取所有renderer组件 */
export function getComponents() {
  const components: (() => JSX.Element)[] = [];
  ComponentsRegistry.forEach((component) => components.push(component));
  return components;
}
