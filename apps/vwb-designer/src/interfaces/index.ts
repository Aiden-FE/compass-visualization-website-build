import { AvailableLanguages } from '@/i18n';
import type { ReactNode } from 'react';

export type CommonComponentProps<P = {}> = {
  lang?: AvailableLanguages | undefined;
} & P;

export type CommonPageProps<P = {}> = {
  children?: ReactNode;
  params: { lng?: AvailableLanguages };
} & P;
