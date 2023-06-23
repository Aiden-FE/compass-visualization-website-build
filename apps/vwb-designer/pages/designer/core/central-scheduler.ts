import { BehaviorSubject } from 'rxjs';
import VWBConfiguration from './configuration';
import Logger from './logger';

export interface ICentralSchedulerOption {
  debug: boolean;
}

export default class CentralScheduler {
  protected option: ICentralSchedulerOption;

  protected logger: Logger;

  private configurationSubject = new BehaviorSubject(new VWBConfiguration());

  public configurationObservable = this.configurationSubject.asObservable();

  constructor(opt?: Partial<ICentralSchedulerOption>) {
    this.option = {
      debug: false,
      ...opt,
    };
    this.logger = new Logger({
      debug: this.option.debug,
      prefix: 'CentralScheduler',
    });
    this.logger.debug('中央调度器准备就绪');
  }

  public updateConfiguration(
    config: Partial<VWBConfiguration>,
    opt?: {
      /** 与当前配置合并 */
      merge: boolean;
    },
  ) {
    const option = {
      merge: true,
      ...opt,
    };
    let newConfig = config;
    if (option.merge) {
      newConfig = VWBConfiguration.merge(this.configurationSubject.getValue(), config);
    }
    this.logger.debug('更新配置: ', newConfig);
    this.configurationSubject.next(newConfig);
  }
}
