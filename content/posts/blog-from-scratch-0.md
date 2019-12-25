---
title: 独立博客建立指南（0）选择
date: 2019-12-25
tags: [blog]
toc: true
comment: true
draft: false
---

本系列文章适用于无相关计算机基础但对独立博客感兴趣的人。

为什么写博客以及为什么选择「独立」博客此处不再赘述，推荐刘末鹏的一篇文章 [《为什么你应该（从现在开始就）写博客》](http://mindhacks.cn/2009/02/15/why-you-should-start-blogging-now/)

---

> 独立博客一般指在采用独立域名和网络主机的博客，既在空间、域名和内容上相对独立的博客。独立博客相当于一个独立的网站，而且不属于任何其他网站。相对于 BSP (Blog service provider) 下的博客，独立博客更自由、灵活，不受限制。

一个网站由 `域名` + `服务器` + 网站程序 (可选) 构成，

## 平台

首先我们要考虑创作的内容放在哪里，即选择”服务器“：

按学习成本由易到难排序 (下面列出的网站或服务并不全面，更多请自行 Google)，

### 1. Blog Hosting (博客托管) 服务

例如 Google 的 [Blogger](https://www.blogger.com/about/?hl=zh-CN) (大陆地区无法访问), [WordPress.com](https://wordpress.com/), [Drupal](https://www.drupal.org/), [Wix](https://www.wix.com/) 提供了拖拽工具。

[Bitcron](https://www.bitcron.com/) 和前面列出的几个有些不同，少数派上有篇介绍文章[《用 Bitcron 搭博客：你只管写作，它负责呈现》
](https://sspai.com/post/40675)

👍 优点：

1. 自定义前缀域名
1. 建站简单快捷
1. 内置社交分享、数据统计等功能
1. 自带 SEO ([Search Engine Optimization](https://zh.wikipedia.org/wiki/%E6%90%9C%E5%B0%8B%E5%BC%95%E6%93%8E%E6%9C%80%E4%BD%B3%E5%8C%96)) 搜索引擎优化，也就是让网站更容易被搜索到

👎 缺点：

1. 有一定限制，高级功能和外观自定义需付费

📝 概括步骤：

1. 注册
1. 选择主题、模版
1. 直接在网站上写作，一般都有自动保存

### 2. Static Website Hosting (静态网站托管) 服务

例如 [Github Pages](https://pages.github.com/), [Coding Pages](https://coding.net/help/doc/pages), [Netlify](https://www.netlify.com/) 等，

和 1. Blog Hosting (博客托管) 服务的区别是后者负责把你的文字“渲染”为网站，前者需要你自己提供"渲染"完成的网站静态文件 (html, css, javascript...)，

因此需要额外学习 [Static Site Generator](https://www.staticgen.com/) (静态网站生成程序) 的使用，例如 [Jekyll](https://jekyllrb.com/), [Hexo](https://hexo.io/), [Hugo](https://gohugo.io/)，同时还有 Markdown 编辑器 [MWeb](https://zh.mweb.im/)

![MWeb](/images/posts/mweb.jpg)

和自带 GUI 的 [Gridea](https://gridea.dev/)

![Gridea](/images/posts/gridea.png)

这两个工具上手难度较低，作者都是国人。

👍 优点：

1. 自定义前缀域名
1. 免费版就能基本涵盖个人使用的全部功能需求
1. 外观功能完全自定义

👎 缺点：

1. 建站学习成本比 1 高
1. 只能在本地写作然后推送到远端
1. 数据统计系统和评论系统需要自己添加
1. 外观自定义需要基础前端 (html, css, javascript) 知识
1. Github Pages 服务器位于美国，直接访问速度不佳，需要一些 tricks 才能被百度爬虫抓取；Coding Pages 只能绑定备案过的域名，有审查

📝 概括步骤：

1. 注册
1. 建立代码仓库 Repository
1. 在本地写作后生成静态网站并推送到远程仓库

### 3. VPS (Virtual private server 虚拟专用服务器)

国内如某某云的 VPS 建站需要备案，要保持独立性就买国外的 VPS，例如我用来搭建 RSSHub 的 [Vultr](https://www.vultr.com/?ref=7802098), [Linode](https://www.linode.com/) 等，[阿里云国际版](https://www.alibabacloud.com/) 或 [腾讯云国际版](https://intl.cloud.tencent.com/) 没有问题但小贵。

👍 优点：

1. 自由度最高
1. (附加) 一台 VPS 不仅可以建站，还可以折腾很多有趣的事，例如「科学上网」、私有云盘  
[（一台 VPS 对于一个开发者/普通人意味着什么？ - 知乎）](https://www.zhihu.com/question/56620173)

👎 缺点：

1. 每月需最低 $5 左右的费用
1. 建站学习成本高，坑多，需要有一颗热爱折腾的心

📝 概括步骤：

1. ~~参考《VPS 建站从入门到放弃》~~
1. [自行 Google](https://www.google.com/search?q=vps%E5%BB%BA%E7%AB%99)

## 域名

「[域名](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D)」Domain Name 通俗来说就是“网址”，例如我的博客域名为 [exuanbo.xyz](https://exuanbo.xyz)，通过此域名便能在浏览器中访问。

说几点注意：

1. 不要在国内域名注册商买域名，例如某某云，[《为什么不要在中国注册域名 - 月光博客》](https://www.williamlong.info/archives/4558.html)
1. [《警告——不要在国内注册和使用CN域名 - 月光博客》](https://www.williamlong.info/archives/1654.html)

---

本博客托管于 [Github Pages](https://pages.github.com/)，由 [Hugo](https://gohugo.io/) 生成。

此系列未完成文章：

- 独立博客建立指南（1）工具
- 独立博客建立指南（2）外观
