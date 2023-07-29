# compass-vwb-designer

> 前端可视化建站项目

## Features

- Scss & BEM & tailwind

支持`.scss`样式文件,无需支持可使用`pnpm remove sass`移除支持

支持 BEM,以下是结合 CSS Modules 的 BEM 示例:

样式声明

```scss
// demo.module.scss
@include b(test) {
  background-color: red;
  @include e(element) {
    background-color: yellowgreen;
    @include m(active) {
      background-color: aqua;
    }
  }
}
```

使用 BEM & CSS Modules 样式

```typescript jsx
import { NextPageWithLayout } from '@/app-env';
import styles from './demo.module.scss';

const DemoPage: NextPageWithLayout = () => {
  return (
    <>
      BEM example:
      <div className={styles['cp-test']}>
        block
        <div className={styles['cp-test__element']}>element</div>
        <div className={styles['cp-test__element_active']}>modify</div>
      </div>
    </>
  );
};

export default DemoPage;
```

_如果需要更换'cp'作用域前缀,请替换`assets/styles/variables.module.scss`内的$domain 变量值_

默认支持 tailwind

```typescript jsx
import { NextPageWithLayout } from '@/app-env';

const DemoPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="text-3xl font-bold underline">tailwind example</div>
    </>
  );
};

export default DemoPage;
```

- Icons & Svg

使用[IconIfy](https://iconify.design/docs/)图标库文件,参考[Iconify for Tailwind CSS](https://iconify.design/docs/usage/css/tailwind/)用法

使用特定图标库需要引入对应配置文件,类似 `@iconify-json/{prefix}`, 其中`{prefix}`替换为实际图表库前缀, 或者直接使用`@iconify/json`全量配置来使用全部[Icons](https://icon-sets.iconify.design/)文件

以 Antd icons 为例

首先安装 Ant Design Icons 配置文件: `pnpm add -D @iconify-json/ant-design`

```typescript jsx
import { NextPageWithLayout } from '@/app-env';

const DemoPage: NextPageWithLayout = () => {
  return (
    <>
      <span
        className="icon-[ant-design--ant-design-outlined]"
        style={{
          color: '#00b9b2',
          fontSize: '48px',
        }}
      />
    </>
  );
};

export default DemoPage;
```

使用 svg 文件

```typescript jsx
import CatSvg from '@/assets/svgs/cat.svg';

import { NextPageWithLayout } from '@/app-env';

const DemoPage: NextPageWithLayout = () => {
  return (
    <>
      <CatSvg
        style={{
          width: '48px',
          height: '48px',
        }}
      />
    </>
  );
};

export default DemoPage;
```

- Stores & Theme

当需要新建一个 Store 时,请复制`templates/store.template.ts`文件到`stores/*`文件夹内,并在`stores/store.ts`的 reducer 内导入,在`stores/index.ts`内导出新 store 所有的可用导出,store 的具体用法参考如下:

```typescript jsx
import { NextPageWithLayout } from '@/app-env';
import { useAppDispatch, exampleActions, useAppSelector } from '@/stores';

const DemoPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  // 读取store内的值
  const text = useAppSelector((state) => state.example.text);

  function setStore() {
    // 执行具体store内的动作
    dispatch(exampleActions.update({}));
  }

  return (
    <>
      <h1>{text}</h1>
      <button onClick={toggleLang} type="button">
        修改Store
      </button>
    </>
  );
};

export default DemoPage;
```

主题使用说明:

```typescript jsx
import { NextPageWithLayout } from '@/app-env';
import { useAppSelector } from '@/stores';
import { useThemeService } from '@/services';
import { AvailableTheme } from '@/config';

const DemoPage: NextPageWithLayout = () => {
  const { getThemeInstance } = useThemeService();
  // 读取当前主题
  const theme = useAppSelector((state) => state.theme.theme);
  // 读取当前主题数据
  const themeData = useAppSelector((state) => state.theme.themeData);

  // 切换主题
  function toggleTheme(themeKey: AvailableTheme) {
    getThemeInstance().toggle(themeKey);
  }

  return (
    <>
      当前主题:
      {theme}
      <br />
      当前主题数据:
      {JSON.stringify(themeData)}
      <br />
      <button onClick={() => toggleTheme(AvailableTheme.AUTO)} type="button">
        使用默认主题
      </button>
      <br />
      <button onClick={() => toggleTheme(AvailableTheme.LIGHT)} type="button">
        使用亮色主题
      </button>
      <br />
      <button onClick={() => toggleTheme(AvailableTheme.DARK)} type="button">
        使用暗黑主题
      </button>
    </>
  );
};

export default DemoPage;
```

主题变量表位于`config/theme.json`路径. 其中 common 属性是所有主题生效的主题变量

当需要扩展一个新的主题,请直接在主题变量表内新增即可

- I18n

翻译文件存放于 `public/locales/[language]/*.json`

使用示例:

```typescript jsx
import { NextPageWithLayout } from '@/app-env';
import { useTranslation } from 'next-i18next';
import { getLocaleProps } from '@/utils';
import { useRouter } from 'next/router';
import { AvailableLanguages, I18nNamespaces } from '@/config';

const DemoPage: NextPageWithLayout = () => {
  const { t, i18n } = useTranslation(I18nNamespaces.COMMON);
  const router = useRouter();

  function toggleLang() {
    if (i18n.language === AvailableLanguages.ZH_CN) {
      const path = router.asPath;
      router.push(path, path, { locale: AvailableLanguages.EN });
    } else {
      const path = router.asPath;
      router.push(path, path, { locale: AvailableLanguages.ZH_CN });
    }
  }

  return (
    <>
      Current lang is:
      {i18n.language}
      <br />
      {t('test')}
      <br />
      <button onClick={toggleLang} type="button">
        切换语言环境
      </button>
    </>
  );
};

// 动态路由添加
// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [],
//   fallback: 'blocking',
// });

export const getStaticProps = getLocaleProps(I18nNamespaces.COMMON);

export default DemoPage;
```

- Eslint

```shell
pnpm lint
```

- Prettier

```shell
pnpm format
```
