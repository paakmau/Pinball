
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        // 获取成员变量
        this.rigidBody = this.getComponent(cc.RigidBody)
        this.worldCenter = this.rigidBody.getWorldCenter()

    },

    // 对小球施加冲量
    bomb(dir) {
        this.rigidBody.applyLinearImpulse(dir, this.worldCenter)
    },

    // 小球传送
    transfer(pos) {
        this.node.position = pos
    },

    goIntoBlackHole(pos) {
        this.node.position = pos
        this.rigidBody.linearVelocity = cc.v2(0, 0)
        // TODO: 没救了
        this.originColor = this.node.color
        this.node.color = new cc.Color(50, 50, 50)
    },

    goOutOfBlackHole(pos, bombDir) {
        this.node.position = pos
        this.rigidBody.applyLinearImpulse(bombDir, this.worldCenter)
        // TODO: 没救了
        this.node.color = this.originColor
    },

    restart() {
        this.rigidBody.linearVelocity = cc.v2(0, 70.0)
    },

    isMoving() {
        return this.rigidBody.linearVelocity.magSqr() >= 0.01
    }
})

module.exports = Ball