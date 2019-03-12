/**
 * 球拍组件
 * direction决定方向
 * power决定力度
 * 要求有刚体
 */
var Racket = cc.Class({
    extends: cc.Component,

    properties: {
        direction: 1,
        power: 350000
    },
    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.torque = this.direction * this.power;
        this.isRotate = false;
        this.originRotation = this.node.rotation;
    },
    setRotate: function(value) {
        this.isRotate = value;
    },
    update(dT) {
        if(this.isRotate)
            this.rigidBody.applyTorque(this.torque);
    }
});
