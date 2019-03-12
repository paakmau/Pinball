
var Ball = require("./Ball");

var BallBombTrampolineGLEvent = require("../Message/GameLogic/BallBombTrampolineGLEvent");
var BallTransferGLEvent = require("../Message/GameLogic/BallTransferGLEvent");
var BonusGainGLEvent = require("../Message/GameLogic/BonusGainGLEvent");
var GameOverGLEvent = require("../Message/GameLogic/GameOverGLEvent");

var BonusGainDGEvent = require("../Message/DataGen/BonusGainDGEvent");
var TrampolineContactDGEvent = require("../Message/DataGen/TrampolineContactDGEvent");
var PortalContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var BallFallDGEvent = require("../Message/DataGen/BallFallDGEvent");

cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            type: Ball,
            default: null
        },
        ballStarterNode: cc.Node
    },
    onLoad() {
        // 初始化成员变量
        this. ballStarterWorldCenter = this.ballStarterNode.position;

        // 开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        // TODO: 发行后不应有这个东西
        // 开启碰撞体边框显示(调试模式)
        cc.director.getPhysicsManager().debugDrawFlags = true;

        var that = this;

        // 观察者模式, 监听子节点的事件

        // 小球蹦床Bomb事件
        this.node.on(BallBombTrampolineGLEvent.Name, function(event) {
            that.ball.bomb(event.bombDir);
            cc.log("BallBomb, type:" + event.trampolineType);
            var dGEvent = new TrampolineContactDGEvent()
            dGEvent.init(event.trampolineType);
            that.node.dispatchEvent(dGEvent);
        });

        // 小球传送事件
        this.node.on(BallTransferGLEvent.Name, function(event) {
            that.ball.transfer(event.pos);
            cc.log("BallTransfer");
            var dGEvent = new PortalContactDGEvent();
            dGEvent.init();
            that.node.dispatchEvent(dGEvent);
        });

        // 获得Bonus事件
        this.node.on(BonusGainGLEvent.Name, function(event) {
            cc.log("BonusGain "+event.factor);
            var dGEvent = new BonusGainDGEvent();
            dGEvent.init(event.factor); // TODO: 应当与当前小球得分倍率相乘再返回
            that.node.dispatchEvent(dGEvent);
        });

        // GameOver事件
        this.node.on(GameOverGLEvent.Name, function(event) {
            that.ball.transfer(that.ballStarterWorldCenter);
            cc.log("Game Over");
            var dGEvent = new BallFallDGEvent();
            dGEvent.init();
            that.node.dispatchEvent(dGEvent);
        })
    }
});
