/**
 * 检查小球离开发射轨道
 */

var BallInOutGLEvent = require("../../Message/GameLogic/BallInOutGLEvent")

var BallOutCheck = cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    onCollisionEnter() {
        var event = new BallInOutGLEvent();
        event.init(false)
        this.node.dispatchEvent(event)
    },

    setActive(value) {
        this.node.active = value
    }
});

module.exports = BallOutCheck