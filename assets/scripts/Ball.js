
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 获取成员变量
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.worldCenter = this.rigidBody.getWorldCenter();

        // 监听Bomb事件
        this.node.on("ball_bomb", this.bomb, this);


        // TODO: 用于测试, 注册键盘输入
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    bomb(dir) {
        this.rigidBody.applyLinearImpulse(dir, this.worldCenter);
    },

    // TODO: 用于测试, KeyDown回调
    // 按下空格, 发射小破球
    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.bomb(cc.v2(0, 5000));
                break;
        }
    }
});

module.exports = Ball;