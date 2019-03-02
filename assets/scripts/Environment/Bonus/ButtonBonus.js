
/**
 * 需要有Enable Contact
 */
var ButtonBonus = cc.Class({
    extends: cc.Component,
    properties: {
    },

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.isPressed = false;
    },

    update(dt) {
        if(this.isPressed) {
            this.pressDown();
            this.isPressed = false;
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        this.isPressed = true;
    },

    // 只能由上层group调用
    setGroup(group) {
        this.group = group;
    },

    reset() {
        // TODO: 播放恢复动画
        this.rigidBody.active = true;

        // 测试用
        this.node.x -= 100;
    },

    pressDown() {
        // TODO: 播放按压动画
        this.rigidBody.active = false;

        // TODO: pressDownOneBtn应当在按压动画结束后调用
        this.node.x += 100;
        this.group.pressDownOneBtn();
    }
});


module.exports = ButtonBonus;