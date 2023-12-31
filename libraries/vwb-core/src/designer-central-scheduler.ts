import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import AppCentralScheduler from './central-scheduler';
import { IDesignerCentralSchedulerOption, IDesignerCentralSchedulerState, VWBApplication } from './interfaces';

export default class DesignerCentralScheduler extends AppCentralScheduler {
  private designerOption: Required<IDesignerCentralSchedulerOption>;

  private configurationStack: VWBApplication[] = [];

  private configurationUndoStack: VWBApplication[] = [];

  private maxStackDeep: number;

  private actionStatusSubject = new BehaviorSubject<IDesignerCentralSchedulerState>({
    isAllowUndo: false,
    isAllowRedo: false,
  });

  public actionStatusObservable = this.actionStatusSubject.asObservable();

  constructor(opt?: Partial<IDesignerCentralSchedulerOption>) {
    super(opt);
    this.designerOption = {
      maxStackDeep: 20,
      ...this.option,
    } as Required<IDesignerCentralSchedulerOption>;
    this.maxStackDeep = this.designerOption.maxStackDeep;
    this.change.subscribe((config) => {
      if (this.configurationStack.length > this.maxStackDeep) {
        this.configurationStack.shift();
      }
      if (config) {
        this.configurationStack.push(VWBApplication.merge(config));
      }
      this.logger.debug('配置发生变更: ', config, '配置堆栈已更新: ', this.configurationStack);
      this.updateActionStatus({
        isAllowRedo: this.isAllowRedo,
        isAllowUndo: this.isAllowUndo,
      });
    });
  }

  /**
   * @description 可撤销的前提是必须存在动作
   */
  get isAllowUndo() {
    return this.configurationStack.length > 1;
  }

  get isAllowRedo() {
    return !!this.configurationUndoStack.length;
  }

  private updateActionStatus(data: Partial<IDesignerCentralSchedulerState>) {
    const actionStatus = {
      ...this.actionStatusSubject.getValue(),
      ...data,
    };
    this.logger.debug('操作状态被更新: ', actionStatus);
    return this.actionStatusSubject.next(actionStatus);
  }

  /**
   * @description 移除最后进入堆栈的记录,将指针指向移除后的队尾数据
   */
  public undo() {
    if (!this.isAllowUndo) {
      return false;
    }
    const undoData = this.configurationStack.pop();
    if (this.configurationUndoStack.length > this.maxStackDeep) {
      this.configurationUndoStack.shift();
    }
    if (undoData) {
      this.configurationUndoStack.push(undoData);
      this.logger.debug('执行撤销, 被撤销的数据为: ', undoData);
    }
    const currentData = this.configurationStack.pop();
    if (currentData) {
      this.updateConfig(currentData, { merge: false });
    }
    return true;
  }

  /**
   * @description 使用最后被撤销的记录,将指针指向移除后的队尾数据
   */
  public redo() {
    if (!this.isAllowRedo) {
      return false;
    }
    const redoData = this.configurationUndoStack.pop();
    if (redoData) {
      this.logger.debug('执行重做, 重做的数据为: ', redoData);
      this.updateConfig(redoData, { merge: false });
    }
    return true;
  }

  public destroy() {
    super.destroy();
    this.configurationStack = [];
    this.configurationUndoStack = [];
    this.actionStatusSubject.complete();
  }
}
