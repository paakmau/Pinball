
var ColliderBonus = cc.Class({
    extends: cc.Component,

    properties: {
        bonusFactor: 1000
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        this.node.emit("bonus_gain", this.bonusFactor);
    }
});

module.exports = ColliderBonus;