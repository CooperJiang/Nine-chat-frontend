![项目图片](https://public-1300678944.cos.ap-shanghai.myqcloud.com/nine/chat-bg.png)

### 项目地址

* github  * 后端项目地址：[项目地址](https://github.com/longyanjiang/Nine-chat-backend.git)    * 前端模块地址： [项目地址](https://github.com/longyanjiang/Nine-chat-frontend.git)  
* gitee     * 后端项目地址：[项目地址](https://gitee.com/jlongyan/Nine-chat-backend.git)    * 前端模块地址：[项目地址](https://gitee.com/jlongyan/Nine-chat-frontend.git)

* 项目 [预览地址](https://jiangly.com/chat)



### 项目启动

* 项目采用了 orm 操作数据库、所以只需要在config中配置上自己的数据库、就会初始化成功、orm会自动创建所需要的数据库
* 项目提供了一个测试数据库、可以直接使用、账号密码都有配置、可以自行操作即可
* 前端部分  `cnpm install`  `npm run dev`
* 后端部分 `pnpm install` `npm run start:dev`  后端使用了`pnpm` 如果启动或者安装依赖失败，请将node版本升级到14+
* 

### 免责声明

平台音乐数据来源于第三方网站，仅供学习交流使用，请勿用于商业用途。



###  已实现功能

```js
1、普通文字聊天、粘贴图片发送、在线搜索表情包发送等聊天功能
2、在线搜索歌曲、点歌、切割、收藏歌曲
3、歌曲实时播放，所有人共享一个实时歌单、一起听歌
4、实时修改个人信息资料
5、支持自定义专属背景
6、快捷键等待你的探索

更多功能等你来提...
```



### 技术栈

* 前端采用 vue + socker-io 开发 暂未使用ui框架
* 后端采用 nestjs + typeorm + mysql + pm2



### 基础目录结构

├── nest-cli.json                  * cli配置
├── src
│   ├── app.module.ts       
│   ├── common				* 公共方法、包含基础orm模型
│   ├── config           		  * 配置文件
│   ├── constant				 * 常量定义 
│   ├── filters					  * 全局捕获错误
│   ├── guard					  * 权限认证
│   ├── interceptor             * 统一数据返回格式 
│   ├── main.ts					* 入口文件
│   ├── modules
│   │   ├── chat					* 聊天室模块
│   │   ├── music				 * 音乐模块
│   │   └── user				   * 用户模块
│   ├── swagger                	* swaager文档
│   └── utils						  * 工具类方法
└── tsconfig.json



> 佛系更新 有需要请 `issues`提 看到有需要就更新、没有就GG