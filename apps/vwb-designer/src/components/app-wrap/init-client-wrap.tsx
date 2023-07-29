'use client';

import { useEffect, useState } from 'react';
import { initializeThemeAsync, useAppDispatch } from '@/stores';
import { initSystemGlobalDeps, getSystemjs } from '@/utils/systemjs.util';
import { CommonComponentProps } from '@/interfaces';

function InitClientWrap({ children }: CommonComponentProps) {
  const dispatch = useAppDispatch();
  const [systemLoaded, setSystemLoaded] = useState(false);

  useEffect(() => {
    // @ts-ignore
    dispatch(initializeThemeAsync());
    if (!systemLoaded) {
      getSystemjs().then(() => {
        setSystemLoaded(true);
        initSystemGlobalDeps();
      });
    }
  });

  return children;
}

export default InitClientWrap;
