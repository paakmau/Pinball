
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

    goIntoBlackHole(pos) {
        this.node.position = pos;
        this.rigidBody.linearVelocity = cc.v2(0, 0);
        // TODO: 应当消失
        this.node.color = new cc.Color(50, 50, 50);
    },

    goOutOfBlackHole(pos, bombDir) {
        this.node.position = pos;
        this.rigidBody.applyLinearImpulse(bombDir, this.worldCenter);
        // TODO: 应当跟随Into改变
        this.node.color = new cc.Color(255, 255, 255);
    },

    restart() {
        this.rigidBody.linearVelocity = cc.v2(0, 70.0);
    }
});

module.exports = Ball;