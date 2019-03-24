var BallFallDGEvent = require("./Message/DataGen/BallFallDGEvent");
var BonusGainDGEvent = require("./Message/DataGen/BonusGainDGEvent");
var PortalContactDGEvent = require("./Message/DataGen/PortalContactGLEvent");
var TrampolineContactDGEvent = require("./Message/DataGen/PortalContactGLEvent");
var dataContainer = require("./Data/dataContainer");
var UIController = require("./UI/UIController");

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
        this.gameData.resetData();
        var that = this;
        //Alert.show("WASTED!! BONUS:" + this.gameData.getBonus(), null, false);
        that.gameUI.gameOver(that.gameData.getBonus());
        
        //球掉落
        this.node.on(BallFallDGEvent.Name, function(event){
            cc.log("Main Controller game over");
            //Alert.show("WASTED!! BONUS:" + that.gameData.getBonus(), null, false, 0.3,that.CameraNode.x, that.CameraNode.y);
            that.gameUI.gameOver(that.gameData.getBonus());
            that.gameData.resetData();
            that.updateUI();
         });

        //获得bonus
        this.node.on(BonusGainDGEvent.Name, function(event){
            cc.log("Main Controller :" + event.type);
            that.gameUI.bonusGain(that.gameData.bonusGain(event.value));
        });

        //传送
        this.node.on(PortalContactDGEvent.name, function(event){
            
        });

        //蹦床
        this.node.on(TrampolineContactDGEvent.Name, function(event){
            cc.log("11111trampoline Contact DG");
            that.gameData.trampolineContact();
        });

    },

    updateBonus(){
        this.gameUI.setBonus(this.gameData.getBonus());
    },

    updateUI(){
        this.updateBonus();
    }
});