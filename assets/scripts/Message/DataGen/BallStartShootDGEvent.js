/**
 * 小球坠毁事件(游戏结束)
 */

var eventName = "BallStartShootDG"

var BallStartShootDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function() {
        this.type = eventName
        this.bubbles = true
    }
})

module.exports = BallStartShootDGEvent