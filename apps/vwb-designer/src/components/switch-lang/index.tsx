'use client';

import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Dropdown } from 'antd';
import { AvailableLanguages, LanguagesMapping } from '@/i18n';
import { CommonComponentProps } from '@/interfaces';
import Link from 'next/link';

export default function SwitchLang({ lang }: CommonComponentProps) {
  const LanguagesArr = LanguagesMapping.map((item) => {
    return {
      ...item,
      label: <Link href={`/${item.key}`}>{item.label}</Link>,
    };
  });

  const selectedKeys = useMemo(() => {
    return [lang || AvailableLanguages.ZH_CN];
  }, [lang]);

  return (
    <Dropdown menu={{ items: LanguagesArr, selectedKeys }} overlayStyle={{ width: '140px' }} trigger={['hover']}>
      <Icon className="cursor-pointer text-3xl" icon="mdi:translate-variant" />
    </Dropdown>
  );
}
