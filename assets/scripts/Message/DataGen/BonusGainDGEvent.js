/**
 * 获得Bonus事件
 * 属性 value 为获得的Bonus值
 */

var eventName = "BonusGainDG";

var BonusGainDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(value) {
        this.type = eventName;
        this.bubbles = true;
        this.value = value;
    }
});

module.exports = BonusGainDGEvent;