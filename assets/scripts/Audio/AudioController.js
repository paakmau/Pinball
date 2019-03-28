
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

    /**
     * 
     * @param {int} i 
     */
    playEffectAudio(i){
        this.effect = cc.audioEngine.playEffect(this.Audios[i], false, 1);
    }

    // update (dt) {},
});
module.exports = AudioController;