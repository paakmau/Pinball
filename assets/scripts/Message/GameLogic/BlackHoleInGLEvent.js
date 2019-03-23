


var eventName = "BlackHoleInGL"

var BlackHoleInGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(pos) {
        this.type = eventName
        this.bubbles = true
        this.pos = pos
    }
})

module.exports = BlackHoleInGLEvent