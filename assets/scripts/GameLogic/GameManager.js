
var Ball = require("./Ball");
var BallBombGLEvent = require("../Message/GameLogic/BallBombGLEvent");
var BallTransferGLEvent = require("../Message/GameLogic/BallTransferGLEvent");
var BonusGainGLEvent = require("../Message/GameLogic/BonusGainGLEvent");

cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            type: Ball,
            default: null
        }
    },
    onLoad() {
        // 开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        var that = this;

        // 观察者模式, 监听子节点的事件

        // 小球Bomb事件
        this.node.on(BallBombGLEvent.Name, function(event) {
            that.ball.bomb(event.bombDir);
            cc.log("BallBomb, type:" + event.bombType);
        });

        // 小球传送事件
        this.node.on(BallTransferGLEvent.Name, function(event) {
            that.ball.transfer(event.pos);
            cc.log("BallTransfer");
        });

        // 获得Bonus事件
        this.node.on(BonusGainGLEvent.Name, function(event) {
            cc.log("BonusGain "+event.factor);
        })
    }
});
