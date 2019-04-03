

var eventName = "BallReadyGL"

var BallReadyGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(isReady) {
        this.type = eventName
        this.bubbles = true
        this.isReady = isReady
    }
})

module.exports = BallReadyGLEvent