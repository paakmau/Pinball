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
    cc.audioEngine.playEffect(AudioPlayerUtil._audioController.Audios[i], false, 1);
}
export default AudioPlayerUtil