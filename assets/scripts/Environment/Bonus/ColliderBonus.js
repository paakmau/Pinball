
/**
 * 该Bonus的碰撞器需要Enable Contact
 */
var ColliderBonus = cc.Class({
    extends: cc.Component,

    properties: {
        bonusFactor: 1000
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        // TODO: 应当使用消息系统
        cc.director.emit("bonus_gain", this.bonusFactor);
    }
});

module.exports = ColliderBonus;