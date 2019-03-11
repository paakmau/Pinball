

var eventName = "BallShoot";

var BallShootEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
        shootDir: cc.v2(0, 0)
    },
    init: function(shootDir) {
        this.type = eventName;
        this.bubbles = true;
        this.shootDir = shootDir
    }
});

module.exports = BallShootEvent;