
var eventName = "BallBombGL";

var BallBombGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName,
        BombType: {
            // bomb的类型
            RectTrampoline: "RectTrampoline",
            CircleTrampoline: "CircleTrampoline",
            ShootTrampoline: "ShootTrampoline",
            StartBomb: "StartBomb"
        }
    },
    properties: {
    },
    init: function(bombDir, bombType) {
        this.type = eventName;
        this.bubbles = true;
        this.bombDir = bombDir;
        this.bombType = bombType;
    }
});

module.exports = BallBombGLEvent;