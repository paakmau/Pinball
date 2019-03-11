/**
 * 蹦床组件
 * 该Node的Collider被小球触到后
 * 会生成一个Node的y向量方向, 大小为bombPower的冲量
 * 并广播
 */

var BallBombTrampolineGLEvent = require("../../Message/GameLogic/BallBombTrampolineGLEvent");

var RectTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        bombPower: 3000
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bombDir = cc.v2(0, 1).rotate(-this.node.rotation/180*3.14159).mul(this.bombPower);
    },
    onBeginContact(contact, selfCollider, otherCollider) {
        // 若被小球碰到, 广播Bomb事件
        // if(otherCollider.node.name == "Ball")
        var bombEvent = new BallBombTrampolineGLEvent();
        bombEvent.init(this.bombDir, BallBombTrampolineGLEvent.TrampolineType.RectTrampoline);
        this.node.dispatchEvent(bombEvent);
    }
});


module.exports = RectTrampoline;