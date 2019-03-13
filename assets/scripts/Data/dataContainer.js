var dataContainer = cc.Class({
    extends: cc.Component,
    properties:{
    },
    onLoad(){
        this.bonus = 0;
        this.portalTimes = 0;
        this.trampolineTimes = 0;
    },

    resetData(){
        this.bonus = 0;
        this.portalTimes = 0;
        this.trampolineTimes = 0;
        cc.log("resetData");
    },

    trampolineContact(){
        this.trampolineTimes++;
        cc.log("Trampoline Contact = " + this.trampolineTimes);
    }


});

module.exports = dataContainer;