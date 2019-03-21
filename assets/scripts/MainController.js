var BallFallDGEvent = require("../Message/DataGen/BallFallDGEvent");
var BonusGainDGEvent = require("../Message/DataGen/BonusGainDGEvent");
var PortalContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var TrampolineContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var dataContainer = require("../scripts/Data/dataContainer");
var UIController = require("../scripts/UI/UIController");

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
        }
    },
    onLoad(){
        cc.log("Load MainController");
        this.gameData.resetData();
        var that = this;
        
        //球掉落
        this.node.on(BallFallDGEvent.Name, function(event){
            cc.log("Main Controller game over");
            that.gameData.resetData();
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

    }
});