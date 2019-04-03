import AudioPlayer from "../Utils/AudioPlayerUtil";

cc.Class({
    extends: cc.Component,

    properties: {
        AudioID: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onBeginContact(contact, selfCollider, otherCollider) {
        AudioPlayer.play(this.AudioID);
    },

    onCollisionEnter() {
        AudioPlayer.play(this.AudioID);
    }

    // update (dt) {},
});
