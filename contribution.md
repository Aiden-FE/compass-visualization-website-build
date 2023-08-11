# 贡献指南

## 安装

### 安装 rush

本地开发环境安装 `npm install -g @microsoft/rush`

ci 环境使用此命令`node common/scripts/install-run-rush.js install`

### 安装所有依赖

通过 `rush update` 恢复所有依赖

使用 `rush build` 构建所有项目

### 管理依赖

> https://rushjs.io/zh-cn/pages/commands/rush_add/

`rush add -p [package_name]` 在对应项目路径下执行添加依赖, --dev 添加开发依赖, -m 为仓库内所有项目同步一致的版本

`rush remove -p [package_name]` 在对应项目路径下执行删除依赖

`rush upgrade-interactive` 通过交互式命令行升级指定依赖

## 执行项目内命令

`rushx [script_name]` 在项目路径下执行此命令可运行项目内 scripts 命令

## 项目结构

```
.
├── apps
│   ├── vwb-designer      # 设计器
│   └── vwb-server        # 后台服务
├── common
│   ├── autoinstallers    # 与业务无关的通用的依赖或命令脚本
│   ├── config            # 配置
│   ├── git-hooks
│   └── scripts           # rush 脚本
├── libraries
│   ├── vwb-core          # 核心包
│   └── vwb-renderer      # 渲染引擎
└── rush.json             # rush 配置文件
```

## Rush 使用文档

[Monorepo usage](https://rushjs.io/)
