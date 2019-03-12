
var Ball = require("./Ball");
var Racket = require("./Racket");

var BallBombTrampolineGLEvent = require("../Message/GameLogic/BallBombTrampolineGLEvent");
var BallTransferGLEvent = require("../Message/GameLogic/BallTransferGLEvent");
var BonusGainGLEvent = require("../Message/GameLogic/BonusGainGLEvent");
var RacketPunchGLEvent = require("../Message/GameLogic/RacketPunchGLEvent");
var GameOverGLEvent = require("../Message/GameLogic/GameOverGLEvent");

var BonusGainDGEvent = require("../Message/DataGen/BonusGainDGEvent");
var TrampolineContactDGEvent = require("../Message/DataGen/TrampolineContactDGEvent");
var PortalContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var RacketPunchDGEvent = require("../Message/DataGen/RacketPunchDGEvent");
var BallFallDGEvent = require("../Message/DataGen/BallFallDGEvent");

cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            type: Ball,
            default: null
        },
        racket: {
            type: Racket,
            default: []
        },
        ballStarterNode: cc.Node
    },
    onLoad() {
        var that = this;

        // 初始化成员变量
        this. ballStarterWorldCenter = this.ballStarterNode.position;

        // 开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        // TODO: 发行后不应有这个东西
        // 开启碰撞体边框显示(调试模式)
        cc.director.getPhysicsManager().debugDrawFlags = true;


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
            that.ball.restart();
            cc.log("Game Over");
            var dGEvent = new BallFallDGEvent();
            dGEvent.init();
            that.node.dispatchEvent(dGEvent);
        });

        // RacketPunch事件
        this.node.on(RacketPunchGLEvent.Name, function(event) {
            cc.log("Racket has punched!");
            var dGEvent = new RacketPunchDGEvent();
            dGEvent.init();
            that.node.dispatchEvent(dGEvent);
        })

        // 监听键盘(触屏)事件
        
        // TODO: 用于测试, 注册键盘输入
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    
    // TODO: 用于测试, KeyDown回调
    // 按下空格, 发射小破球
    onKeyDown(event) {
        var impulse = 1000;
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.ball.bomb(cc.v2(0, impulse));
                break;
            case cc.macro.KEY.s:
                this.ball.bomb(cc.v2(0, -impulse));
                break;
            case cc.macro.KEY.a:
                this.racket[0].setRotate(true);
                break;
            case cc.macro.KEY.d:
                this.racket[1].setRotate(true);
                break;
        }
    },
    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.racket[0].setRotate(false);
                break;
            case cc.macro.KEY.d:
                this.racket[1].setRotate(false);
                break;
        }
    }
});
