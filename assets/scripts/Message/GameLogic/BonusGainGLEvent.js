

var eventName = "BonusGainGL";

var BonusGainGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(factor) {
        this.type = eventName;
        this.bubbles = true;
        this.factor = factor
    }
});

module.exports = BonusGainGLEvent;