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
