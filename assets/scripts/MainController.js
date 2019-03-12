var BallFallDGEvent = require("../Message/DataGen/BallFallDGEvent");
var BonusGainDGEvent = require("../Message/DataGen/BonusGainDGEvent");
var PortalContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var TrampolineContactDGEvent = require("../Message/DataGen/PortalContactGLEvent");
var dataContainer = require("../scripts/Data/dataContainer");

cc.Class({
    extends: cc.Component,
    properties:{
        data: {
            default: null,
            type: dataContainer
        }
    },
    onLoad(){
        cc.log("Load MainController");
        var that = this;
        

        // this.node.on(BallFallDGEvent.name, function(event){
        //     that.data.resetData();
        // });

        // this.node.on(BonusGainDGEvent.name, function(event){
            
        // });

        // this.node.on(PortalContactDGEvent.name, function(event){
            
        // });

        // this.node.on(TrampolineContactDGEvent.name, function(event){
            
        // });

    }
});