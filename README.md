# 弹球游戏

### 简介
使用cocos creator制作的三维弹球游戏, 基于h5或微信小游戏

### 架构
UI层使用MVC架构
游戏逻辑使用观察者模式

#### 观察者模式(游戏逻辑层)
所有游戏逻辑层的node都是GameLogicRoot的子孙
利用消息系统将触发的消息传送至GameLogicRoot上的GameManager组件

#### 消息系统
利用node.dispatch将消息发送至祖先节点(GameLogicRoot)

#### MVC架构(UI层)
负责显示游戏得分等状态
正在设计