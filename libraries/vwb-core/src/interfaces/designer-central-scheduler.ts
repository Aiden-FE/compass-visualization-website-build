import { ICentralSchedulerOption } from '@/interfaces/common';

export interface IDesignerCentralSchedulerState {
  isAllowUndo: boolean;

  isAllowRedo: boolean;
}

export interface IDesignerCentralSchedulerOption extends ICentralSchedulerOption {
  maxStackDeep?: number;
}
