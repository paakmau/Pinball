/**
 * 检查小球离开发射轨道
 */

var BallOutGLEvent = require("../../Message/GameLogic/BallOutGLEvent")

var BallOutCheck = cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    onCollisionEnter() {
        var event = new BallOutGLEvent();
        event.init()
        this.node.dispatchEvent(event)
    },

    setActive(value) {
        this.node.active = value
    }
});

module.exports = BallOutCheck