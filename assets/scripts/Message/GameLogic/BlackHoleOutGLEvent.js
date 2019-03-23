


var eventName = "BlackHoleOutGL"

var BlackHoleOutGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(pos, bombDir) {
        this.type = eventName
        this.bubbles = true
        this.pos = pos
        this.bombDir = bombDir
    }
})

module.exports = BlackHoleOutGLEvent