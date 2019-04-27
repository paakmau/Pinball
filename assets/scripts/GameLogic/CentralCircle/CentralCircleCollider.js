var CentralCircleCollideEvent = require("../../Message/GameLogic/CentralCircleCollideGLEvent")
//发生碰撞之后，
var CentralCircleCollider = cc.Class({

    extends: cc.Component,
    properties:{

    },
    onCollisionEnter: function (other, self) {
        var event = new CentralCircleCollideEvent()
        event.init(1)
        this.node.dispatchEvent(event)
    }
})