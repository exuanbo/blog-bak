---
draft: false
date: 2019-01-13T11:36:32+01:00
title: "如何处理 Git 中 .DS_Store 文件"
tags: [mac, git]
toc: true
comment: true
---

我最近新换了 Mac 系统，使用 git 时发现目录下自动生成了一个隐藏的 `.DS_Store` 文件。`.DS_Store`（英文全称 Desktop Services Store）是一种由苹果公司的 Mac OS 操作系统所创造的隐藏文件，目的在于存贮目录的自定义属性，例如文件们的图标位置或者是背景色的选择。相当于 Windows 系统下的 `desktop.ini`。

## 删除 .DS_Store

1. 删除项目中的所有 `.DS_Store`。这会跳过不在项目中的 `.DS_Store`

```bash
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

2. 更新项目

```bash
git add -A
git commit -m '.DS_Store banished!'
```

可以使用下面的命令来删除本地磁盘中当前目录及其子目录下的所有 `.DS_Store` 文件

```bash
find . -name ‘*.DS_Store’ -type f -delete
```

## 全局忽略 .DS_Store

在今后的使用中为了省去每次单独编辑 git 目录中 `.gitignore` 文件的麻烦，需要添加全局忽略文件

1. 创建 `~/.gitignore_global` 文件，把需要全局忽略的文件写入该文件，语法和 `.gitignore` 一样
1. 在 git 配置文件 `~/.gitconfig` 中引入 `.gitignore_global` 文件

```ini
[core]
excludesfile = ~/.gitignore_global
```

也可以通过这个命令来实现

```bash
git config --global core.excludesfile ~/.gitignore_global
```

## 禁用或启用自动生成 .DS_Store

- 禁止 `.DS_store` 生成

```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
```

- 恢复 `.DS_store` 生成

```bash
defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```

## 延伸阅读

1. [如何在 GitHub.com 上删除某个 Repository 中的某个文件夹？ - 知乎](https://www.zhihu.com/question/20418177)
2. [常用 .gitignore · Mac OS X 配置指南](https://wild-flame.github.io/guides/docs/mac-os-x-setup-guide/gitignore)
