
var eventName = "BallBomb";

var BallBombEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
        bombDir: cc.v2(0, 0)
    },
    init: function(bombDir) {
        this.type = eventName;
        this.bubbles = true;
        this.bombDir = bombDir
    }
});

module.exports = BallBombEvent;