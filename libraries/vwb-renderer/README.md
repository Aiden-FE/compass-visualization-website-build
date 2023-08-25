# @compass-aiden/vwb-renderer

> 可视化站点渲染器

## 快速上手

`pnpm add @compass-aiden/vwb-core @compass-aiden/vwb-renderer` 安装包

前置依赖 systemjs

```html
<!-- 也可以采用其他可用CDN地址 -->
<script src="https://aidenoss.cpolar.cn/compass-open/3rd/systemjs/system.min.js"></script>
```

完整示例:

```html
<body>
  <div id="root"></div>
  <script src="https://aidenoss.cpolar.cn/compass-open/3rd/systemjs/system.min.js"></script>
  <script type="module">
    import React, { createElement } from 'react';
    import { createRoot } from 'react-dom/client';
    import { VWBApplication, VWBPage, VWBWidget } from '@compass-aiden/vwb-core';
    import { VWBAppRenderer, registerComponent } from '@compass-aiden/vwb-renderer';

    window.React = React;

    const page = new VWBPage({
      layouts: [
        {
          i: '0001',
          w: 2,
          h: 2,
          x: 0,
          y: 0,
        },
      ],
      widgets: [
        new VWBWidget({
          id: '0001',
          material: {
            componentName: 'text',
            from: 'remote',
            type: 'react-component',
            url: 'http://127.0.0.1:5174/dist/vwb-material-text.umd.js',
          },
          props: {
            text: 'test',
          },
        }),
      ],
    });
    const appConfig = new VWBApplication({
      pages: [page],
      selectedPageId: page.id,
    });

    // 注册后可以使用本地物料组件 material: { from: 'preset' }
    // registerComponent('text', createElement(Text, { text: 'Hi, this is Text component' }));

    const root = createRoot(document.querySelector('#root'));

    root.render(createElement(VWBAppRenderer, { appConfig }));
  </script>
</body>
```

导出的`import { VWBAppRenderer, VWBPageRenderer, VWBWidgetRenderer } from '@compass-aiden/vwb-renderer';`都可以独立使用

VWBAppRenderer 是用来渲染多页应用程序的渲染器,详细参数请参考 VWBAppRendererProps

VWBPageRenderer 是用来渲染单页界面的渲染器,详细参数请参考 VWBPageRendererProps

VWBWidgetRenderer 是用来渲染局部组件的渲染器,详细参数请参考 VWBWidgetRendererProps
