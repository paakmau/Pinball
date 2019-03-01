
/**
 * 蹦床组件
 * 该Node的Collider被小球触到后
 * 会生成一个Node的y向量方向, 大小为bombPower的冲量
 * 并广播
 */
var Trampoline = cc.Class({
    extends: cc.Component,

    properties: {
        bombPower: 100
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bombDir = cc.v2(0, 1).rotate(this.node.rotation).mul(this.bombPower);
    },
    onBeginContact(contact, selfCollider, otherCollider) {
        // 若被小球碰到, 广播Bomb事件
        if(otherCollider.node.name == "Ball")
            this.node.emit("ball_bomb", this.bombDir);
    }
});


module.exports = Trampoline;