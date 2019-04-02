
/**
 * 需要有Enable Contact
 */
var ButtonBonus = cc.Class({
    extends: cc.Component,
    properties: {
    },

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody)
        this.isPressed = false;
        this.havePressed = false;
        this.animation = this.getComponent(cc.Animation);
        //this.animation.play(0);
    },

    update(dt) {
        if(this.havePressed) {
             this.pressDown();
             this.havePressed = false;
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        if(!this.isPressed){
            this.isPressed = true;
            this.havePressed = true;
            //this.pressDown();
        }
    },


    // 只能由上层group调用
    setGroup(group) {
        this.group = group
    },

    reset() {
        if(this.isPressed){
            // TODO: 播放恢复动画
            //this.rigidBody.enabledContactListener = true;
            
            // 测试用
            // this.animation.play(1);
            this.node.x += 6;
            this.isPressed = false;
        }
    },

    pressDown() {
        //this.rigidBody.enabledContactListener = false

        // TODO: pressDownOneBtn应当在按压动画结束后调用
        this.node.x -= 6
        // this.animation.play(0);

        this.group.pressDownOneBtn()
    }
})


module.exports = ButtonBonus