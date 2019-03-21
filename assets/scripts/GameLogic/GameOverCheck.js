/**
 * 小球碰到则会触发GameOver事件
 * 要求有普通碰撞器
 */

var GameOverGLEvent = require("../Message/GameLogic/GameOverGLEvent")

cc.Class({
    extends: cc.Component,
    properties: {
    },
    
    onCollisionEnter: function() {
        var event = new GameOverGLEvent()
        event.init()
        this.node.dispatchEvent(event)
    }
})
