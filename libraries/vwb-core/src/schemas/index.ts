import Ajv from 'ajv';
import ApplicationSchema from './application.schema.json';
import PageSchema from './page.schema.json';
import WidgetSchema from './widget.schema.json';
import WidgetConfigSchema from './widget-config.schema.json';

const ajv = new Ajv({
  useDefaults: true,
  coerceTypes: true,
});

// 验证应用数据
export const applicationValidate = ajv.compile(ApplicationSchema);
export const applicationValidateAsync = ajv.compileAsync(ApplicationSchema);

// 验证页面数据
export const pageValidate = ajv.compile(PageSchema);
export const pageValidateAsync = ajv.compileAsync(PageSchema);

// 验证组件数据
export const WidgetValidate = ajv.compile(WidgetSchema);
export const WidgetValidateAsync = ajv.compileAsync(WidgetSchema);

// 验证组件配置数据
export const WidgetConfigValidate = ajv.compile(WidgetConfigSchema);
export const WidgetConfigValidateAsync = ajv.compileAsync(WidgetConfigSchema);
