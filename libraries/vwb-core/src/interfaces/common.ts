import type { Logger } from '@compass-aiden/utils';

export interface ICentralSchedulerOption {
  logLevel?: Logger['config']['logLevel'];
  logSubject?: string;
}

export interface IVWBMaterial {
  packageName: string;
  version: string | 'latest';
  exportName: '';
  componentName: string;
  main: string;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
