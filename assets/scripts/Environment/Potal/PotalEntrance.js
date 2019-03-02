/**
 * 要求Node的有一个位于中心的小型普通球形碰撞器
 * exit为出口, 锚点为(0.5, 0.5)
 */
cc.Class({
    extends: cc.Component,

    properties: {
        exit: cc.Node
    },

    onLoad() {
        this.exitWorldCenter = this.exit.position;
    },

    onCollisionStay() {
        // TODO: 应当使用消息系统
        cc.director.emit("ball_transfer", this.exitWorldCenter);
    }
});
