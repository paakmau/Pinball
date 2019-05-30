/**
 * 发射型蹦床
 * 当小球与该蹦床接触, 并且速度为0时
 * 小球会被发射出去
 * 需要普通Collider
 * 
 * 更改：发射的时候力度
 */

var BallBombTrampolineGLEvent = require("../../Message/GameLogic/BallBombTrampolineGLEvent")

var ShootTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        shootPower: 1000,
        shootDir: cc.v2(0, 1),
        touchBallTimeBeforeShoot: 1.5,
        randomFactor: 20
    },

    onLoad() {
        this.shootDir = this.shootDir.normalize()
        this.isTouchBall = false
        this.touchBallTime = 0.0
    },
    onCollisionEnter() {
        this.isTouchBall = true
    },
    onCollisionExit() {
        this.isTouchBall = false
    },
    update(dT) {
        if(this.isTouchBall)
            this.touchBallTime += dT
        else this.touchBallTime = 0
        if(this.touchBallTime >= this.touchBallTimeBeforeShoot) {
            this.touchBallTime = 0
            var event = new BallBombTrampolineGLEvent()
            event.init(this.shootDir.mul(this.randomFactor * (Math.random() - 0.5) + this.shootPower), BallBombTrampolineGLEvent.TrampolineType.ShootTrampoline)
            this.node.dispatchEvent(event)
        }
    }
})

module.exports = ShootTrampoline