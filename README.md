<p align="center"><a href="https://www.21cake.com/" target="_blank" rel="noopener noreferrer"><img width="234" src="http://static.21cake.com/themes/site/img/logo.png" alt="logo"></a></p>

## 项目介绍

使用 Node.js + Koa2 + MySQL + Vue.js 本源码纯属学习临摹，请勿用于商业用途，如拿去非法使用与本人无关。正版地址：[https://www.21cake.com/](https://www.21cake.com/)

## 临摹地址
cms：https://cms.z-changzhi.cn

Pc端：https://m.z-changzhi.cn


## 项目主要功能

[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

- Koa2服务端
    - 管理员与权限控制
    - 产品
    - 产品分类
    - 产品详情
    - 产品评论
- 前端PC网站 Vue.js
    - 用户登陆
    - 用户注册
    - 购物车功能
    - 用户下单功能
- 前端移动端 uni-app
- 后台管理系统 Vue.js

## 项目的亮点
- Koa2服务端
    - Koa 与 Koa 二次开发API
    - 多 koa-router 拆分路由
    - require-directory 自动路由加载
    - 异步编程 - async/await
    - 异步异常链与全局异常处理
    - Sequelize ORM 管理 MySQL
    - JWT 权限控制中间件
    - 参数验证器 Validator 
    - nodemon 修改文件自动重启
    - 前后端分离
- 前端PC网站 Vue.js
    - 使用 Vue.js 搭建前端网站和后台管理系统


### 数据库
启动项目前一定要在创建好 `zcake` 数据库。
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 zcake 数据库
$ CREATE DATABASE IF NOT EXISTS zcake DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 修改数据库配置
请在 [|——config/config.js](https://github.com/liangfengbo/nodejs-koa-cake/cake/master/config/config.js) 文件下修改您本地的数据库名字（`zcake`）和数据库密码。

### 克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

根目录都是 Node.js + Koa2 API开发源代码，根目录下的 web 文件夹下都是前端网站项目源代码，根目录下的 admin 文件夹下都是后台管理系统的源代码。


```
# 克隆项目代码
$ git clone https://github.com/z-changzhi/nodejs-koa-cake.git

# 进入koa项目根目录
$ cd nodejs-koa-cake

# 安装包
$ npm install

# 运行服务
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000

// 前端项目使用
1. 在根目录下进入web项目：cd web，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8080/ 即可以访问。

// 后台管理系统使用
1. 在根目录下进入admin项目：cd admin，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8083/ 即可以访问。
```

### 接口说明（重要）
项目的所有接口文档都这里，可以逐个文档看。
- [管理员接口文档说明](./doc/admin.md)
- [产品分类接口文档说明](./doc/category.md)
- [产品接口文档说明](./doc/product.md)
- [产品详情接口文档说明](./doc/productDetail.md)

## License

项目已实现管理员、权限管理、文章、分类、评论等接口，前端模板网站和后台管理系统。自己可以根据项目代码学习，可以到 postman 软件中测试API或学习。

喜欢或对你有帮助的话，请你点一个星星 <strong style='color:red;'>star</strong> 鼓励我，或者您有更好的建议和意见，请提出来告知我，可以留言 
