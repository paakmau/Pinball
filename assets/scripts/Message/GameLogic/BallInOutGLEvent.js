

var eventName = "BallInOutGL"

var BallInOutGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(isIn) {
        this.type = eventName
        this.bubbles = true
        this.isIn = isIn
    }
})

module.exports = BallInOutGLEvent