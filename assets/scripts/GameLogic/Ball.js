
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        // 获取成员变量
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.worldCenter = this.rigidBody.getWorldCenter();

    },

    // 对小球施加冲量
    bomb(dir) {
        this.rigidBody.applyLinearImpulse(dir, this.worldCenter);
    },

    // 小球传送
    transfer(pos) {
        this.node.position = pos;
    },

    restart() {
        this.rigidBody.linearVelocity = cc.v2(0, 70.0);
    }
});

module.exports = Ball;