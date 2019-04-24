import AudioPlayer from "../../Utils/AudioPlayerUtil"

/**
 * 需要有Enable Contact
 */
var ButtonBonus = cc.Class({
    extends: cc.Component,
    properties: {
        AudioID: 0
    },

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody)
        this.isPressed = false;
        this.havePressed = false;
        this.animation = this.getComponent(cc.Animation);
    },

    update(dt) {
        if(this.havePressed) {
             this.pressDown();
             this.havePressed = false;
        }
    },

    onBeginContact() {
        if(!this.isPressed){
            this.isPressed = true;
            this.havePressed = true;
            AudioPlayer.play(this.AudioID);
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

            this.node.x += 6;
            this.isPressed = false;
        }
    },

    pressDown() {
        //this.rigidBody.enabledContactListener = false

        // TODO: pressDownOneBtn应当在按压动画结束后调用
        this.node.x -= 6
        this.group.pressDownOneBtn()
    }
})


module.exports = ButtonBonus