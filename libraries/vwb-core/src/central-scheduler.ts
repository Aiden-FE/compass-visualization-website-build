import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Logger } from '@compass-aiden/utils';
import { ICentralSchedulerOption, DeepPartial, VWBApplication, VWBPage } from '@/interfaces';

/**
 * @description 应用调度中心
 */
export default class AppCentralScheduler {
  /** 配置项 */
  protected option: ICentralSchedulerOption;

  /** 日志记录器 */
  protected logger: Logger;

  private configSubject: BehaviorSubject<VWBApplication>;

  /** 配置变更 */
  change: ReturnType<BehaviorSubject<VWBApplication>['asObservable']>;

  constructor(opt?: Partial<ICentralSchedulerOption>) {
    this.option = {
      logLevel: 'log',
      logSubject: 'CentralScheduler',
      ...opt,
    };
    this.logger = new Logger();
    this.logger.updateConfig({
      subject: this.option.logSubject || '',
      logLevel: this.option.logLevel,
    });
    this.logger.debug('中央调度器准备就绪');
    this.configSubject = new BehaviorSubject(opt?.defaultAppConfig || new VWBApplication());
    this.change = this.configSubject.asObservable();
  }

  destroy() {
    this.configSubject.complete();
    this.logger.debug('执行卸载内部资源');
  }

  /** 更新应用配置 */
  updateConfig<IsMerge extends boolean = true>(
    config: IsMerge extends true ? DeepPartial<VWBApplication> : VWBApplication,
    opt?: {
      /** 与当前配置合并 */
      merge?: IsMerge;
    },
  ) {
    const option = {
      merge: true,
      ...opt,
    };
    let newConfig: VWBApplication;
    if (option.merge) {
      newConfig = VWBApplication.merge({}, this.configSubject.getValue(), config as VWBApplication);
    } else {
      newConfig = config as VWBApplication;
    }
    this.logger.debug('更新配置: ', newConfig);
    this.configSubject.next(newConfig);
  }

  /** 更新页面配置 */
  updatePage<IsMerge extends boolean = true>(
    pageConfig: IsMerge extends true ? DeepPartial<VWBPage> & { id: string } : VWBPage,
    opt?: {
      /** 与当前配置合并 */
      merge?: IsMerge;
    },
  ) {
    const option = {
      merge: true,
      ...opt,
    };
    const appConfig = this.configSubject.getValue();
    const index = this.getPageIndexById(pageConfig.id, appConfig);
    if (index === -1) {
      throw new Error('Not found target page');
    }
    if (option.merge) {
      appConfig.pages[index] = VWBPage.merge(appConfig.pages[index], pageConfig as VWBPage);
    } else {
      appConfig.pages.splice(index, 1, pageConfig as VWBPage);
    }
    this.updateConfig(new VWBApplication({ ...appConfig }), { merge: false });
  }

  protected getPageIndexById(id: string, appConfig = this.configSubject.getValue()) {
    return appConfig.pages.findIndex((page) => page.id === id);
  }
}
