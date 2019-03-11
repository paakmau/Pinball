
var Ball = require("./Ball");
var BallBombEvent = require("../Message/GameLogic/BallBombEvent");
var BallTransferEvent = require("../Message/GameLogic/BallTransferEvent");
var BonusGainEvent = require("../Message/GameLogic/BonusGainEvent");

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
        this.node.on(BallBombEvent.Name, function(event) {
            that.ball.bomb(event.bombDir);
        });

        // 小球传送事件
        this.node.on(BallTransferEvent.Name, function(event) {
            that.ball.transfer(event.pos);
        });

        // 获得Bonus事件
        this.node.on(BonusGainEvent.Name, function(event) {
            cc.log("Bonus Gain "+event.factor);
        })
    }
});
