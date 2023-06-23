import { merge } from 'lodash-es';

export default class VWBConfiguration {
  platform?: 'pc' | 'tablet' | 'mobile' = 'pc';

  language?: string = 'zh-CN';

  static merge(...settings: Partial<VWBConfiguration>[]): VWBConfiguration {
    const newSetting = new VWBConfiguration();

    return merge(newSetting, ...settings);
  }
}
