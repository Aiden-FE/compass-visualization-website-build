# OAuth 模块

## 预设登陆逻辑流程

> 示例仅打通邮箱的简单登陆流程

- 用户无 token 进入前端系统
- 选择登陆方式
- 人机校验
- 人机静默验证通过后并且账号密码匹配发送邮箱验证码
- 对应账号及验证码存入 redis 缓存,5 分钟有效期
- 凭借账号密码验证码三因素登陆