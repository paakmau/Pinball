
/**
 * 该Bonus的碰撞器需要Enable Contact
 */
var ColliderBonus = cc.Class({
    extends: cc.Component,

    properties: {
        bonusFactor: 1000
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        this.node.emit("bonus_gain", this.bonusFactor); // TODO: 应当使用消息系统
    }
});

module.exports = ColliderBonus;