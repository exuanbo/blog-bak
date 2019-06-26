---
title: "Mac 使用日记（四）踩过的坑"
description: ""
date: 2019-01-31
categories: []
tags: []
isCJKLanguage: true
comment: true
toc: true
draft: true
---

homebrew 和 python、pip

pip 如何安装

不要 sudo easy_install pip

pip3 install xxx

pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available.

重新安装 openssl

brew uninstall openssl - 不要 brew unlink openssl 否则再次安装时 Error: /usr/local/opt/openssl is not a valid keg

brew install openssl

