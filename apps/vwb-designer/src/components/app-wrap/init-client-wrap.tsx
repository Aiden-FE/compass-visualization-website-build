'use client';

import { ReactNode, useEffect } from 'react';
import { initializeThemeAsync, useAppDispatch } from '@/stores';
import { CommonComponentProps } from '@/interfaces';

function InitClientWrap({
  children,
}: CommonComponentProps<{
  children: ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(initializeThemeAsync());
  });

  return children;
}

export default InitClientWrap;
