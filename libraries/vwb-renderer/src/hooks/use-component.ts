import { IVWBMaterial } from '@compass-aiden/vwb-core';
import { JSX, useEffect, useState } from 'react';
import { getComponentByName, registerComponent } from '@/utils';

declare global {
  interface Window {
    System: any;
  }
}

export default function useComponent(materialMeta: IVWBMaterial) {
  const [Component, setComponent] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localComponent = getComponentByName(materialMeta.componentName) || null;
    if (localComponent || materialMeta.from === 'preset') {
      setComponent(localComponent);
      setLoading(false);
    }
    if (!localComponent && materialMeta.from === 'remote') {
      window.System.import(materialMeta.url)
        .then((result: any) => {
          const comp: JSX.Element = result[materialMeta.exportName || 'default'];
          registerComponent(materialMeta.componentName, () => comp);
          setComponent(() => comp);
        })
        .finally(() => setLoading(false));
    }

    return () => {
      setComponent(null);
      setLoading(true);
    };
  }, [materialMeta]);

  return {
    Component,
    loading,
  };
}
