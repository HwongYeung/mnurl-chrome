# <img src="icons/icon48.png" width="28" align="top"> mnurl - 短网址生成器

[English](README.md) | [中文](README_CN.md)

一款通过 [mnurl.com](https://mnurl.com) 快速生成短网址的 Chrome 扩展。

## 功能特性

- **一键缩短** — 即时为当前页面生成短网址
- **快速复制** — 一键复制生成的短网址到剪贴板
- **历史记录** — 浏览所有已创建的短网址，含点击次数和创建日期，支持分页
- **用户信息** — 配置 API Key 后展示账户名称和套餐信息
- **设置管理** — 随时配置和修改 API Key
- **多语言支持** — 支持英文、简体中文、繁体中文，可在扩展内切换语言

## 安装

### 从源码安装

1. 克隆本仓库
   ```bash
   git clone https://github.com/HwongYeung/mnurl-chrome.git
   ```
2. 打开 Chrome，地址栏输入 `chrome://extensions/`
3. 开启右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**，选择 `mnurl-chrome` 文件夹
5. mnurl 图标将出现在浏览器工具栏中

## 配置

1. 点击工具栏中的 mnurl 图标
2. 点击 **Go to Settings**（或齿轮图标）
3. 输入你的 API Key — 从 [mnurl.com/api-documentation](https://mnurl.com/api-documentation) 获取
4. 点击 **Save**

## 使用方法

### 生成短网址

1. 打开任意网页
2. 点击 mnurl 图标
3. 点击 **Generate Short URL**
4. 点击 **Copy** 将结果复制到剪贴板

### 查看历史记录

点击顶部的时钟图标，浏览所有已创建的短网址。每条记录包含：

- 短网址（可复制、可打开）
- 原始目标链接
- 点击次数
- 创建日期

### 修改 API Key

随时点击顶部的齿轮图标，查看账户信息或修改 API Key。

## 技术栈

- Chrome Extension Manifest V3
- 原生 HTML / CSS / JavaScript
- 无外部依赖
- [mnurl.com API](https://mnurl.com/api-documentation)

## 项目结构

```
mnurl-chrome/
├── manifest.json    # 扩展配置
├── popup.html       # 弹窗界面
├── popup.css        # 样式
├── popup.js         # 核心逻辑
├── i18n.js          # 国际化（运行时语言切换）
├── _locales/        # Chrome 官方 manifest 本地化
│   ├── en/messages.json
│   ├── zh_CN/messages.json
│   └── zh_TW/messages.json
└── icons/           # 扩展图标 (16/32/48/128px)
```

## 权限说明

| 权限 | 用途 |
|---|---|
| `activeTab` | 读取当前标签页的 URL |
| `clipboardWrite` | 复制短网址到剪贴板 |
| `storage` | 本地存储 API Key |
| `host_permissions` | 向 mnurl.com 发送 API 请求 |

## 许可证

MIT
