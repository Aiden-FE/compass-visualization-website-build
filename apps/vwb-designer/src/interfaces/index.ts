import { DeepPartial, IVWBMaterial, VWBLayoutItem, VWBWidgetConfiguration } from '@compass-aiden/vwb-core';
import { AvailableLanguages } from '@/i18n';

export type CommonComponentProps<P extends Record<any, any> = object> = {
  lang?: AvailableLanguages | undefined;
} & P;

export type CommonPageProps<P = {}> = {
  params: { lng?: AvailableLanguages };
} & P;

export type MaterialConfig<Item extends Partial<VWBLayoutItem> = {}> = {
  layout: { w: number; h: number } & Item;
  material: IVWBMaterial;
  getDefaultConfig: (defaultConfig?: DeepPartial<VWBWidgetConfiguration>) => VWBWidgetConfiguration;
};
