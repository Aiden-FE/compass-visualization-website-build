import { AvailableLanguages } from '@/i18n';
import type { ReactNode } from 'react';

export interface PageProps {
  children?: ReactNode;
  params: { lng?: AvailableLanguages };
}

export interface ComponentProps {
  lang?: AvailableLanguages | undefined;
}

export type CommonComponentProps<P = {}> = ComponentProps & P;

export type CommonPageProps<P = {}> = PageProps & P;
