/**
 * 该Bonus的碰撞器需要普通Collider
 */

var BonusGainEvent = require("../../Message/GameLogic/BonusGainEvent")

var ColliderBonus = cc.Class({
    extends: cc.Component,

    properties: {
        bonusFactor: 1000
    },

    onCollisionEnter(other, self) {
        // 发送Bonus获得消息
        var event = new BonusGainEvent();
        event.init(this.bonusFactor);
        this.node.dispatchEvent(event);
    }
});

module.exports = ColliderBonus;