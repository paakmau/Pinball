# 弹球游戏

## 简介

使用cocos creator制作的三维弹球游戏, 基于h5或微信小游戏  

## 架构

UI层使用MVC架构  
游戏逻辑使用观察者模式  

### 游戏逻辑(观察者模式)

所有游戏逻辑层的node都是GameLogicRoot的子孙  
利用消息系统将触发的消息传送至GameLogicRoot上的GameManager组件  

### 消息系统

利用node.dispatch将消息发送至祖先节点(GameLogicRoot)  

### UI层(MVC架构)

负责显示游戏得分等状态  

#### Alert

Alert目前因为微信的开放数据域和云开发, 结构独立, 比较混乱
开放数据域效率奇低, 没有找到解决方法

### 音频管理

封装成工具类  
与可复用的组件  

### 组件

自定了平滑摄像机, 碰撞音频播放器, 碰撞动画播放器等组件
与逻辑无耦合, 方便使用
