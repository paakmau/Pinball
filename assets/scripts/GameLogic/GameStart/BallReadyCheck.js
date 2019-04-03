var BallReadyGLEvent = require("../../Message/GameLogic/BallReadyGLEvent")

cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    onCollisionEnter() {
        var readyGLEvent = new BallReadyGLEvent()
        readyGLEvent.init(true)
        this.node.dispatchEvent(readyGLEvent)
    },
    onCollisionExit() {
        var readyGLEvent = new BallReadyGLEvent()
        readyGLEvent.init(false)
        this.node.dispatchEvent(readyGLEvent)
    }
});
