/**
 * 检查小球进入发射轨道
 */

var BallInOutGLEvent = require("../../Message/GameLogic/BallInOutGLEvent")

var BallInCheck = cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    onCollisionEnter() {
        var event = new BallInOutGLEvent();
        event.init(true)
        this.node.dispatchEvent(event)
    },

    setActive(value) {
        this.node.active = value
    }
});

module.exports = BallInCheck