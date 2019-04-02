
import AudioPlayer from "./Utils/AudioPlayerUtil";
var BallFallDGEvent = require("./Message/DataGen/BallFallDGEvent")
var BonusGainDGEvent = require("./Message/DataGen/BonusGainDGEvent")
var PortalContactDGEvent = require("./Message/DataGen/PortalContactGLEvent")
var TrampolineContactDGEvent = require("./Message/DataGen/TrampolineContactDGEvent")
var DataContainer = require("./Data/DataContainer")
var UIController = require("./UI/UIController")
var AudioController = require("./Audio/AudioController")

cc.Class({
    extends: cc.Component,
    properties:{
        gameData: {
            default: null,
            type: DataContainer
        },
        gameUI:{
            default: null,
            type: UIController
        },
        gameAudio:{
             default: null,
             type: AudioController
         }
    },
    onLoad(){
        var that = this;
        this.gameData.resetData();
        AudioPlayer.init(this.gameAudio);

        // 用户登录
        

        // 球掉落
        this.node.on(BallFallDGEvent.Name, function(event){
            cc.log("Main Controller game over");
            //Alert.show("WASTED!! BONUS:" + that.gameData.getBonus(), null, false, 0.3,that.CameraNode.x, that.CameraNode.y);
            that.gameOver();
            //that.gameAudio.playEffectAudio(6);
            AudioPlayer.play(6);
         });

        //获得bonus
        this.node.on(BonusGainDGEvent.Name, function(event){
            cc.log("Main Controller :" + event.type);
            that.gameUI.setBonus(that.gameData.bonusGain(event.value));
            //that.gameAudio.playEffectAudio(5);
            //AudioPlayer.play(5);
        })

        //传送
        this.node.on(PortalContactDGEvent.Name, function(event){
            //that.gameAudio.playEffectAudio(4);
            AudioPlayer.play(4);
        })

        //蹦床
        this.node.on(TrampolineContactDGEvent.Name, function(event){
            cc.log("11111trampoline Contact DG");
            that.gameData.trampolineContact();
            
            switch(event.trampolineType){
                case "RectTrampoline":
                    //that.gameAudio.playEffectAudio(1);
                    //AudioPlayer.play(1);
                    break;
                case "CircleTrampoline":
                    //that.gameAudio.playEffectAudio(2);
                    //AudioPlayer.play(2);
                    break;
                case "ShootTrampoline":
                    //that.gameAudio.playEffectAudio(3);
                    AudioPlayer.play(3);
                    break;
            }

        })

    },

    start() {
        // TODO: 用于测试
        this.gameOver()
    },

    updateBonus(){
        this.gameUI.setBonus(this.gameData.getBonus());
    },

    updateUI(){
        this.updateBonus();
    },
    gameOver(){
        this.resultBonus = this.gameData.getBonus()
        // UserApi.UpdateScoreById({ id: 2, score: that.resultBonus }, res => { 
        //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + "rank = " + res.rank +" highscore = " + res.highestScore);
        //     Alert.Change("WASTED!! BONUS:" + that.resultBonus +  "\nrank = " + res.rank +" highscore = " + res.highestScore);
            
        // });
        this.gameData.resetData();
        this.updateUI();
        this.gameUI.gameOver(this.resultBonus);
    }
})