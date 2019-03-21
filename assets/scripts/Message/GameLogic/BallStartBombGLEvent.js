
var eventName = "BallStartBombGL"

var BallStartBombGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(bombDir) {
        this.type = eventName
        this.bubbles = true
        this.bombDir = bombDir
    }
})

module.exports = BallStartBombGLEvent