import Ajv from 'ajv';
import ApplicationSchema from './application.schema.json';
import PageSchema from './page.schema.json';
import WidgetSchema from './widget.schema.json';
import WidgetConfigSchema from './widget-config.schema.json';

const ajv = new Ajv({
  useDefaults: true,
  coerceTypes: true,
  strict: false,
  removeAdditional: true,
});

ajv.addSchema([WidgetConfigSchema, WidgetSchema, PageSchema, ApplicationSchema]);

// 验证应用数据
export const applicationValidate = ajv.compile(ApplicationSchema);

// 验证页面数据
export const pageValidate = ajv.compile(PageSchema);

// 验证组件数据
export const widgetValidate = ajv.compile(WidgetSchema);

// 验证组件配置数据
export const widgetConfigValidate = ajv.compile(WidgetConfigSchema);
