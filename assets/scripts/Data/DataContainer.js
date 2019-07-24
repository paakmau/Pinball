var DataContainer = cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad() {
        this.bonus = 0;
        this.portalTimes = 0;
        this.trampolineTimes = 0;
    },

    resetData() {
        this.bonus = 0;
        this.portalTimes = 0;
        this.trampolineTimes = 0;
        // cc.log("resetData");
    },

    trampolineContact() {
        this.trampolineTimes++;
        // cc.log("Trampoline Contact = " + this.trampolineTimes);
    },
    bonusGain(value) {
        this.bonus += value;
        // cc.log("get bonus:" + value + ", all bonus = " + this.bonus);
        return this.bonus;
    },
    getBonus() {
        return this.bonus;
    }


});

module.exports = DataContainer;