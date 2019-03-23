
/**
 * 小球传送事件
 */

var eventName = "PortalContactDG"

var PortalContactDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName,
    },
    properties: {
    },
    init: function() {
        this.type = eventName
        this.bubbles = true
    }
})

module.exports = PortalContactDGEvent