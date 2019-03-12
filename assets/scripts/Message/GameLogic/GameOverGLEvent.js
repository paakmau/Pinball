

var eventName = "GameOverGL";

var GameOverGLEvent = cc.Class({
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

module.exports = GameOverGLEvent;