var eventName = "CentralCircleCollideGL"

var CentralCircleCollideGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(factor) {
        this.type = eventName
        this.factor = factor
        this.bubbles = true

    }
})

module.exports = CentralCircleCollideGLEvent