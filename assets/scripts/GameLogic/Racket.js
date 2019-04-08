/**
 * 球拍组件
 * direction决定方向
 * power决定力度
 * 要求有刚体
 */

var RacketPunchGLEvent = require("../Message/GameLogic/RacketPunchGLEvent")


var Racket = cc.Class({
    extends: cc.Component,

    properties: {
        direction: 1,
        power: 700000
    },
    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody)
        //this.torque = this.direction * this.power
        this.angularImpulse = this.direction * this.power
        this.isRotate = false
        this.originRotation = this.node.rotation
    },
    update(dT) {
        if(this.isRotate)
            //this.rigidBody.applyTorque(this.torque)
            this.rigidBody.applyAngularImpulse(this.angularImpulse)
    },
    onBeginContact() {
        var event = new RacketPunchGLEvent()
        event.init()
        this.node.dispatchEvent(event)
    },
    setRotate: function(value) {
        this.isRotate = value
    }
})


module.exports = Racket