

var eventName = "RacketPunchDG";

var RacketPunchDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function() {
        this.type = eventName;
        this.bubbles = true;
    }
});

module.exports = RacketPunchDGEvent;