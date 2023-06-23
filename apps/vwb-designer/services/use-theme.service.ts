import { ThemeManager } from '@compass-aiden/utils';
import { ThemeConfig } from '@/config';
import { debounce } from 'lodash-es';

let ThemeInstance: ThemeManager;

const initTheme = debounce(
  (afterChanged?: (themeName: string | undefined, themeData: Record<string, string | number> | null) => void) => {
    if (ThemeInstance) {
      return;
    }
    ThemeInstance = new ThemeManager({
      baseVariables: ThemeConfig.common,
      hooks: {
        afterToggle: afterChanged,
      },
    });
    Object.keys(ThemeConfig).forEach((key) => {
      ThemeInstance.register(key, ThemeConfig[key]);
    });

    ThemeInstance.register('default', ThemeConfig.light || ThemeConfig.common);
  },
  200,
);

function getThemeInstance() {
  return ThemeInstance;
}

export default function useThemeService() {
  return {
    initTheme,
    getThemeInstance,
  };
}
