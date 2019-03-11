/**
 * 发射型蹦床
 * 当小球与该蹦床接触, 并且速度为0时
 * 小球会被发射出去
 * 需要普通Collider
 */

var BallShootEvent = require("../../Message/GameLogic/BallShootEvent");

var ShootTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        shootPower: 150000,
        shootDir: cc.v2(0, 1)
    },

    onLoad() {
        this.shootDir = this.shootDir.normalize().mul(this.shootPower);
    },
    onCollisionStay() {
        var event = new BallShootEvent();
        BallShootEvent.init(this.shootDir);
        this.node.dispatchEvent(event);
    }
});

module.exports = ShootTrampoline;