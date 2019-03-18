/**
 * 该Bonus的碰撞器需要普通Collider
 */

var BonusGainGLEvent = require("../../Message/GameLogic/BonusGainGLEvent")

var ColliderBonus = cc.Class({
    extends: cc.Component,

    properties: {
        bonusFactor: 1000
    },

    onLoad() {
        this.animation = this.getComponent(cc.Animation);
    },

    onCollisionEnter(other, self) {
        // 播放Bonus动画
        this.animation.play("ColliderBonusTrigger");

        // 发送Bonus获得消息
        var event = new BonusGainGLEvent();
        event.init(this.bonusFactor);
        this.node.dispatchEvent(event);
    }
});

module.exports = ColliderBonus;