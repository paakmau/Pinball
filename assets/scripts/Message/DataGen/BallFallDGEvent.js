/**
 * 小球坠毁事件(游戏结束)
 */

var eventName = "BallFallDG"

var BallFallDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(bombDir, bombType) {
        this.type = eventName
        this.bubbles = true
    }
})

module.exports = BallFallDGEvent