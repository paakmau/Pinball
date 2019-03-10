
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        // 获取成员变量
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.worldCenter = this.rigidBody.getWorldCenter();

        // TODO: 用于测试, 注册键盘输入
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    // 对小球施加冲量
    bomb(dir) {
        this.rigidBody.applyLinearImpulse(dir, this.worldCenter);
    },

    // 小球传送
    transfer(pos) {
        this.node.position = pos;
    },

    // TODO: 用于测试, KeyDown回调
    // 按下空格, 发射小破球
    onKeyDown(event) {
        var impulse = 1000;
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.bomb(cc.v2(0, impulse));
                break;
            case cc.macro.KEY.s:
                this.bomb(cc.v2(0, -impulse));
                break;
            case cc.macro.KEY.a:
                this.bomb(cc.v2(-impulse, 0));
                break;
            case cc.macro.KEY.d:
                this.bomb(cc.v2(impulse, 0));
                break;
        }
    }
});

module.exports = Ball;