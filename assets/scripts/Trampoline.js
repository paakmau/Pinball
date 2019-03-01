
var Trampoline = cc.Class({
    extends: cc.Component,

    properties: {
        bombPower: 5
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bombDir = cc.v2(0, 1).rotate(this.node.rotation).mul(this.bombPower);
    },
    onBeginContact(contact, selfCollider, otherCollider) {

    }

    // update (dt) {},
});


module.exports = Trampoline;