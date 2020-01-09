---
title: "Mac 使用日记 1 | 系统设置"
date: 2019-01-11
tags: [mac]
comment: true
toc: true
draft: true
---

## 菜单栏

- 电池：显示百分比

## 系统偏好设置

### 通用

- 外观：深色
- 显示滚动条：始终

### 程序坞

- 大小：最大
- 放大：取消
- 置于屏幕上的位置：左边
- 连按窗口标题栏以：缩放
- 在程序坞中显示最近使用的应用程序：取消

### 调度中心

- 仪表盘：关闭

### 显示器

- 原彩显示：取消

### 键盘

键盘：

- 按键重复：快
- 重复前延迟：短或倒数第二格

文本：

- 自动大写字词的首字母：取消
- 连按两下空格键插入句号：取消
- 触控栏键入建议：取消

### 触控板

光标与点按：

- 轻点来点按

滚动缩放：

- 滚动方向：自然

更多手势：全部

### 声音

- 在菜单栏中显示音量

### Siri

- 在菜单栏中显示 Siri：取消

## 其他

### 改变 Launchpad 中应用图标的大小

1 设置 Launchpad 的列数，对应于每一行 App 的个数

```bash
defaults write com.apple.dock springboard-columns -int 列数
```

2 设置 Launchpad 的行数，对应于每一列 App 的个数

```bash
defaults write com.apple.dock springboard-rows -int 行数
```

3 重置 Launchpad

```bash
defaults write com.apple.dock ResetLaunchPad -bool TRUE
```

4 重置 Dock

```bash
killall Dock
```

你也可以将所有指令放到一句话中，每一个分句用「;」分隔，我们来看看将 Launchpad 从 7 x 5 布局调整为 9 x 7 布局的效果，在 terminal 中输入指令并按下回车：

```bash
defaults write com.apple.dock springboard-columns -int 9;defaults write com.apple.dock springboard-rows -int 7;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock
```

## 延伸阅读和参考

1. [系统偏好设置· Mac OS X 配置指南](https://wild-flame.github.io/guides/docs/mac-os-x-setup-guide/preference_and_settings/readme)
1. [通过终端命令改变 Launchpad 中应用图标的大小丨一日一技 · Mac](https://sspai.com/post/33299)