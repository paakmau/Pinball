
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.worldCenter = this.rigidBody.getWorldCenter();
    }

    // update (dt) {},
});

module.exports = Ball;