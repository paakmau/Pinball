/**
 * 检查小球进入发射轨道
 */

var BallInGLEvent = require("../../Message/GameLogic/BallInGLEvent")

var BallInCheck = cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    onCollisionEnter() {
        var event = new BallInGLEvent();
        event.init()
        this.node.dispatchEvent(event)
    },

    setActive(value) {
        this.node.active = value
    }
});

module.exports = BallInCheck