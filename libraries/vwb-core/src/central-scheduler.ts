import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Logger } from '@compass-aiden/utils';
import { VWBConfiguration, ICentralSchedulerOption, DeepPartial } from '@/interfaces';

export default class CentralScheduler {
  protected option: ICentralSchedulerOption;

  protected logger: Logger;

  private configurationSubject = new BehaviorSubject(new VWBConfiguration());

  public configurationObservable = this.configurationSubject.asObservable();

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
  }

  public updateConfiguration<IsMerge extends boolean = true>(
    config: IsMerge extends true ? DeepPartial<VWBConfiguration> : VWBConfiguration,
    opt?: {
      /** 与当前配置合并 */
      merge?: IsMerge;
    },
  ) {
    const option = {
      merge: true,
      ...opt,
    };
    let newConfig: VWBConfiguration;
    if (option.merge) {
      newConfig = VWBConfiguration.merge({}, this.configurationSubject.getValue(), config as VWBConfiguration);
    } else {
      newConfig = config as VWBConfiguration;
    }
    this.logger.debug('更新配置: ', newConfig);
    this.configurationSubject.next(newConfig);
  }

  public destroy() {
    this.logger.debug('执行卸载内部资源');
    this.configurationSubject.complete();
  }
}
