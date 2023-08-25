import merge from 'lodash-es/merge';
import { nanoid } from 'nanoid';
import VWBPage from '@/interfaces/page';

/** 应用配置 */
export default class VWBApplication {
  /** 页面配置 */
  pages: VWBPage[] = [];

  /** 应用id */
  id = nanoid();

  /** 目标平台 */
  platform: 'pc' | 'tablet' | 'mobile' = 'pc';

  /** 语言 */
  language: string = 'zh-CN';

  /**
   * @description 模式
   *
   * - 'preview' 仅预览
   * - 'editable' 可编辑
   */
  mode: 'preview' | 'editable' = 'preview';

  /** 已选择页面的id */
  selectedPageId?: string;

  constructor(app?: Partial<VWBApplication>) {
    if (app) {
      merge(this, app);
    }
  }

  /** 合并配置项 */
  static merge(...settings: Partial<VWBApplication>[]): VWBApplication {
    const newSetting = new VWBApplication();

    return merge(newSetting, ...settings);
  }
}
