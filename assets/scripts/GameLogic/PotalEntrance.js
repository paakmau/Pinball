/**
 * 要求Node的有一个位于中心的小型普通球形碰撞器
 * exit为出口, 锚点为(0.5, 0.5)
 */

var BallTransferGLEvent = require("../../Message/GameLogic/BallTransferGLEvent")

cc.Class({
    extends: cc.Component,

    properties: {
        exit: cc.Node
    },

    onLoad() {
        this.exitWorldCenter = this.exit.position
    },

    onCollisionStay() {
        // 触发传送事件
        var transEvent = new BallTransferGLEvent()
        transEvent.init(this.exitWorldCenter)
        this.node.dispatchEvent(transEvent)
    }
})
