/**
 * 球形蹦床
 * 若小球碰到它, 会被施加一个沿碰撞法向量n的冲量 bombPower*n
 */

var BallBombTrampolineGLEvent = require("../../Message/GameLogic/BallBombTrampolineGLEvent")

var CircleTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        bombPower: 200
    },
    onLoad() {
        this.animation = this.getComponent(cc.Animation)
    },
    
    onBeginContact(contact, selfCollider, otherCollider) {
        // 触发Bomb事件
        var bombDir = otherCollider.node.position.sub(selfCollider.node.position).normalize().mul(this.bombPower)
        var bombEvent = new BallBombTrampolineGLEvent()
        bombEvent.init(bombDir, BallBombTrampolineGLEvent.TrampolineType.CircleTrampoline)
        this.node.dispatchEvent(bombEvent)
    }
})

module.exports = CircleTrampoline