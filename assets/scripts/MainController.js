import UserApi from "Api/User";
var BallFallDGEvent = require("./Message/DataGen/BallFallDGEvent")
var BonusGainDGEvent = require("./Message/DataGen/BonusGainDGEvent")
var PortalContactDGEvent = require("./Message/DataGen/PortalContactGLEvent")
var TrampolineContactDGEvent = require("./Message/DataGen/PortalContactGLEvent")
var dataContainer = require("./Data/dataContainer")
var UIController = require("./UI/UIController")

cc.Class({
    extends: cc.Component,
    properties:{
        gameData: {
            default: null,
            type: dataContainer
        },
        gameUI:{
            default: null,
            type: UIController
        },
        CameraNode:cc.Node
    },
    onLoad(){
        cc.log("Load MainController");
        var that = this;
        UserApi.RegisterOrLoginByWxId('zyqnb!!!', res=>{ 
            console.log(res);
            cc.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!result = " + res);
            that.palyerID = res;
         });
         UserApi.UpdateScoreById({ id: 2, score: 1005 }, res => { console.log(res) })
        this.gameData.resetData();
        //Alert.show("WASTED!! BONUS:" + this.gameData.getBonus(), null, false);
        that.gameUI.gameOver(that.gameData.getBonus());
        UserApi.UpdateScoreById({ id: 2, score: that.gameData.getBonus() }, res => { console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + res) })
        
        //球掉落
        this.node.on(BallFallDGEvent.Name, function(event){
            cc.log("Main Controller game over");
            //Alert.show("WASTED!! BONUS:" + that.gameData.getBonus(), null, false, 0.3,that.CameraNode.x, that.CameraNode.y);
            that.gameUI.gameOver(that.gameData.getBonus());
            UserApi.UpdateScoreById({ id: 2, score: 1005 }, res => { console.log(res) })
            that.gameData.resetData();
            that.updateUI();
         });

        //获得bonus
        this.node.on(BonusGainDGEvent.Name, function(event){
            cc.log("Main Controller :" + event.type)
            that.gameUI.bonusGain(that.gameData.bonusGain(event.value))
        })

        //传送
        this.node.on(PortalContactDGEvent.name, function(event){
            
        })

        //蹦床
        this.node.on(TrampolineContactDGEvent.Name, function(event){
            cc.log("11111trampoline Contact DG")
            that.gameData.trampolineContact()
        })

    },

    updateBonus(){
        this.gameUI.setBonus(this.gameData.getBonus())
    },

    updateUI(){
        this.updateBonus()
    }
})