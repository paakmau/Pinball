var BallFallDGEvent = require("../Message/DataGen/BallFallDGEvent");
var BonusGainDGEvent = require("../Message/DataGen/BonusGainDGEvent");
var PortalContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var TrampolineContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var dataContainer = require("../scripts/Data/dataContainer");

cc.Class({
    extends: cc.Component,
    properties:{
        gameData: {
            default: null,
            type: dataContainer
        }
    },
    onLoad(){
        cc.log("Load MainController");
        this.gameData.resetData();
        var that = this;
        

        this.node.on(BallFallDGEvent.Name, function(event){
            cc.log("Main Controller game over");
            that.gameData.resetData();
         });

        this.node.on(BonusGainDGEvent.Name, function(event){
            cc.log("Main Controller :");
        });

        // this.node.on(PortalContactDGEvent.name, function(event){
            
        // });

        this.node.on(TrampolineContactDGEvent.Name, function(event){
            cc.log("11111trampoline Contact DG");
            that.gameData.trampolineContact();
        });

    }
});