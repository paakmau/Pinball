const AudioPlayerUtil = {
    _audioController:     null,     //audioController
    _isMute:    false,    //静音
}
AudioPlayerUtil.init = function (audioController){
    
    //实例
    AudioPlayerUtil._audioController = audioController;
    cc.audioEngine.play(AudioPlayerUtil._audioController.Audios[0], true, 1);
}
AudioPlayerUtil.play = function (i){
    //AudioPlayerUtil._audioController.palyerEffectAudio(i);
    if(i >= AudioPlayerUtil._audioController.Audios.length){
        i = 1;
    }
    cc.audioEngine.playEffect(AudioPlayerUtil._audioController.Audios[i], false, 0.5);
}
export default AudioPlayerUtil