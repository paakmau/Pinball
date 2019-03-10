

var eventName = "BonusGain";

var BonusGainEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
        factor: 0
    },
    init: function(factor) {
        this.type = eventName;
        this.bubbles = true;
        this.factor = factor
    }
});

module.exports = BonusGainEvent;