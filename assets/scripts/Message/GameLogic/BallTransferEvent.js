

var eventName = "BallTransfer";

var BallTransferEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
        pos: cc.v2(0, 0)
    },
    init: function(pos) {
        this.type = eventName;
        this.bubbles = true;
        this.pos = pos
    }
});

module.exports = BallTransferEvent;