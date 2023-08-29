import type { Logger } from '@compass-aiden/utils';
import { VWBApplication } from '@/interfaces/index';

export interface ICentralSchedulerOption {
  defaultAppConfig?: VWBApplication;
  logLevel?: Logger['config']['logLevel'];
  logSubject?: string;
}

export interface IVWBBaseMaterial {
  /** 物料类型 */
  type: 'react-component';
  /** 组件名 */
  componentName: string;
  /**
   * 组件来源
   *
   * - local 采用registerComponent注册的本地组件
   * - remote 远程组件
   */
  from: 'local' | 'remote';
}

/** React本地组件, 本地组件需要提前通过renderer包导出的注册器进行注册 */
export interface IVWBReactComponentLocalMaterial extends IVWBBaseMaterial {
  type: 'react-component';
  from: 'local';
}

/** React远程组件 */
export interface IVWBReactComponentRemoteMaterial extends IVWBBaseMaterial {
  type: 'react-component';
  from: 'remote';
  url: string;
  /**
   * @description umd的导出名
   * @default default
   * @example
   * export default Component; // 这种导出名就是default
   * export { Component }; // 这种导出名就是Component
   */
  exportName?: string;
}

/** 组件物料 */
export type IVWBMaterial = IVWBReactComponentLocalMaterial | IVWBReactComponentRemoteMaterial;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
