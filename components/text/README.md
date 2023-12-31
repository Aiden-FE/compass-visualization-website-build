# vwb-atomic-text

>

## Features

- Auto Import

支持自动导入'react', 'react-i18next'等库

```typescript jsx
export default function Demo() {
  const [] = useState(0);
  const { t } = useTranslation();

  return <>{t('message.common.test')}</>;
}
```

- Icons

项目内置了 [unplugin-icons](https://github.com/antfu/unplugin-icons), 请参考文档使用

所有 icon 支持自动导入,无需手动 import,依赖自动安装,类似如下方式直接使用即可:

在 https://icon-sets.iconify.design/ 可以直接搜索所有 icon 资源,antd 的 icon 也一样存在

更多用法参考 [unplugin-icons](https://github.com/antfu/unplugin-icons) 官方文档即可

```typescript jsx
export default function Demo() {
  return (
    <>
      <IconAntDesignSearchOutlined />
    </>
  );
}
```

- vite-plugin-svgr

```typescript jsx
import DemoIcon from '@/assets/svg/demo.svg';

export default function Demo() {
  return (
    <>
      <DemoIcon />
    </>
  );
}
```

- postcss & autoprefixer & tailwindcss

```typescript jsx
export default function Demo() {
  return (
    <>
      <p className="underline">Test</p>
    </>
  );
}
```

- Stores & Theme

创建 Store 参考: src/stores/theme.store.ts,然后在 src/stores/store.tsx 内使用

组件用法示例:

```typescript jsx
import { ThemeContext, useThemeStore } from '@/stores';

export default function Demo() {
  const { theme } = useContext(ThemeContext);
  const { getThemeInstance } = useThemeStore();

  function toggleTheme(themeKey: string) {
    getThemeInstance().toggle(themeKey);
  }

  return (
    <>
      当前主题: {theme}
      <button onClick={() => toggleTheme('default')} type="button">
        切换默认主题
      </button>
      <br />
      <button onClick={() => toggleTheme('light')} type="button">
        切换亮色主题
      </button>
      <br />
      <button onClick={() => toggleTheme('dark')} type="button">
        切换暗黑主题
      </button>
    </>
  );
}
```

- Base Styles & BEM.scss

全局样式`src/assets/styles/global.scss`

默认导入所有样式表顶部`src/assets/styles/base/variables.scss`,并导入 bem.scss,domain 前缀可通过 variables.scss 内变量修改

```scss
@include b(demo) {
  // .cp-demo
  color: red;
  height: 2000px;
  @include e(element) {
    // .cp-demo__element
    @include m(modify) {
      // .cp-demo__element_modify
    }
  }
}
```

- I18n

```typescript jsx
export default function Demo() {
  const { t, i18n } = useTranslation();
  function toggleLang(lang: string) {
    i18n.changeLanguage(lang);
  }
  return (
    <>
      当前语言环境: {i18n.language}
      {t('message.common.test')}
      <button onClick={() => toggleLang('en')} type="button">
        使用英语
      </button>
      <br />
      <button onClick={() => toggleLang('zh-CN')} type="button">
        使用中文
      </button>
    </>
  );
}
```

- Eslint

使用 Airbnb Eslint 规则

`npm run lint` 执行检查

- Prettier

`npm run format` 执行检查
