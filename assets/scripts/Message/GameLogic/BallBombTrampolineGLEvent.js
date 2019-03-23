
var eventName = "BallBombTrampolineGL"

var BallBombTrampolineGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName,
        TrampolineType: {
            // Trampoline的类型
            RectTrampoline: "RectTrampoline",
            CircleTrampoline: "CircleTrampoline",
            ShootTrampoline: "ShootTrampoline",
        }
    },
    properties: {
    },
    init: function(bombDir, trampolineType) {
        this.type = eventName
        this.bubbles = true
        this.bombDir = bombDir
        this.trampolineType = trampolineType
    }
})

module.exports = BallBombTrampolineGLEvent