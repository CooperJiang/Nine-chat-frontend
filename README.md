

### 2.x版本已经更新

![项目图片](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1654005363486image.png)

### 项目地址

* github  * 后端项目地址：[项目地址](https://github.com/longyanjiang/Nine-chat-backend.git)    * 前端模块地址： [项目地址](https://github.com/longyanjiang/Nine-chat-frontend.git)  
* gitee     * 后端项目地址：[项目地址](https://gitee.com/jlongyan/Nine-chat-backend.git)    * 前端模块地址：[项目地址](https://gitee.com/jlongyan/Nine-chat-frontend.git)
* 项目 [体验地址](http://chat.jiangly.com/#/)



## 项目迁移

* 一台云服务器

* 一个mysql服务器即可

* 一个私有文件远程存储的接口

  项目已经提供了测试数据，拉下项目可直接运行，**typeorm**可自动化建表，无需额外操作，修改数据库地址即可快速迁移完成。



### 项目启动

* 项目采用了 orm 操作数据库、所以只需要在config中配置上自己的数据库、就会初始化成功、orm会自动创建所需要的数据库

* 项目提供了一个测试数据库、可以直接使用、账号密码都有配置、可以自行操作即可

* 前端部分  `cnpm install`  `npm run dev`

* 后端部分 `pnpm install` `npm run start:dev`  后端使用了`pnpm` 如果启动或者安装依赖失败，请将node版本升级到14+ 或者使用**pnpm6 **版本

  

  

### 免责声明

平台音乐数据来源于第三方网站，仅供学习交流使用，请勿用于商业用途。



###  更新历史

```html
1.x:
	1、普通文字聊天、粘贴图片发送、在线搜索表情包发送等聊天功能
	2、在线搜索歌曲、点歌、切割、收藏歌曲
	3、歌曲实时播放，所有人共享一个实时歌单、一起听歌
	4、实时修改个人信息资料
	5、支持自定义专属背景
	6、快捷键等待你的探索

2.x: 2022051
	1.新增个人私有房间，支持用户创建自己独立的房间了
	2.新增图片或文件发送，可直接粘贴到输入框即可
	3.支持消息引用，点击引用的消息会自动滚动到指定位置
	4.上拉平滑加载更多[修复1.0]上拉抖动问题
	5.新增消息两分钟内可撤回
	6.划分三级权限 超级管理员>房主>普通用户 支持加密房间
	7.新增夜间主题和透明主题，支持部分快捷操作
	8.新增部分快捷键

更多功能等你来提...
```



## 项目部分截图

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1654006264775image.png)



![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1654006389564image.png)



![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1654007260850WechatIMG855.png)



![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1654007427663WechatIMG856.png)

### 基础技术栈

* 前端采用 vue + socker-io 未使用ui框架

* 后端采用 nestjs + typeorm + mysql + socket.io

  

> 佛系更新 有需要请 `issues`提 看到有需要就更新、没有就GG



### 关于更新

详情功能看预览地址，有bug就留言，就更新，没需要就G了，基础模型功能都有，可以自己二次开发。

有时间也会更新部分功能上去、尽量做到简洁、方便各位移植和部署。

有创意或想法可以提issues，采纳会回复更新。