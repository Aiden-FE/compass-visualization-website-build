import type { Logger } from '@compass-aiden/utils';
import { VWBApplication } from '@/interfaces/index';

export interface ICentralSchedulerOption {
  defaultAppConfig?: VWBApplication;
  logLevel?: Logger['config']['logLevel'];
  logSubject?: string;
}

/** React本地组件, 本地组件需要提前通过renderer包导出的注册器进行注册 */
export interface IVWBReactComponentPresetMaterial {
  type: 'react-component';
  from: 'preset';
  componentName: string;
}

/** React远程组件 */
export interface IVWBReactComponentRemoteMaterial {
  type: 'react-component';
  from: 'remote';
  componentName: string;
  url: string;
}

/** 组件物料 */
export type IVWBMaterial = IVWBReactComponentPresetMaterial | IVWBReactComponentRemoteMaterial;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
