/**
 * 该Bonus的碰撞器需要普通Collider
 */

var BonusGainGLEvent = require("../../Message/GameLogic/BonusGainGLEvent")

var PhysicsColliderBonus = cc.Class({
    extends: cc.Component,

    properties: {
        bonusFactor: 1000
    },

    onLoad() {
        this.animation = this.getComponent(cc.Animation);
    },

    onBeginContact() {
        // 发送Bonus获得消息
        var event = new BonusGainGLEvent();
        event.init(this.bonusFactor);
        this.node.dispatchEvent(event);
    }
});

module.exports = PhysicsColliderBonus;