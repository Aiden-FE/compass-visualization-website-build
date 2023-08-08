import { AvailableLanguages } from '@/i18n';

export type CommonComponentProps<P extends Record<any, any> = object> = {
  lang?: AvailableLanguages | undefined;
} & P;

export type CommonPageProps<P = {}> = {
  params: { lng?: AvailableLanguages };
} & P;
