
var AudioController = cc.Class({
    extends: cc.Component,

    properties: {
        Audios: {
            default:[],
            type:[cc.AudioClip],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.backGround = cc.audioEngine.play(this.Audios[0], true, 1);
    },

    start () {

    },


    // update (dt) {},
});
module.exports = AudioController;