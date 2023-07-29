import React from 'react';
import reactDOM from 'react-dom';
import { IS_CLIENT } from '@/config';

export function getSystemjs(): Promise<typeof System> {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    if (!IS_CLIENT) {
      resolve(System);
    }
    if (System) {
      resolve(System);
      return;
    }
    function getSystem() {
      if (System) {
        resolve(System);
        return;
      }
      if (Date.now() - startTime > 1000 * 10) {
        reject(new Error('Not found systemjs'));
        return;
      }
      setTimeout(getSystem, 100);
    }
    setTimeout(getSystem, 100);
  });
}

export function initSystemGlobalDeps() {
  if (!IS_CLIENT) {
    return;
  }
  System.addImportMap({
    imports: {
      process: 'app:process',
      React: 'app:React',
      ReactDOM: 'app:ReactDOM',
    },
  });
  window.process = process;
  window.React = React;
  // System.set('app:process', process);
  // System.set('app:React', React);
  System.set('app:ReactDOM', reactDOM);
}
