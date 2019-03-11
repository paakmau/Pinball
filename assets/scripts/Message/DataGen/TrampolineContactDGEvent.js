/**
 * 蹦床触发事件
 * 属性 TrampolineType指明是哪一种蹦床
 */

var eventName = "TrampolineContactDG";

var TrampolineContactDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName,
        TrampolineType: {
            // Tranpoline的类型
            RectTrampoline: "RectTrampoline",
            CircleTrampoline: "CircleTrampoline",
            ShootTrampoline: "ShootTrampoline"
        }
    },
    properties: {
    },
    init: function(TrampolineType) {
        this.type = eventName;
        this.bubbles = true;
        this.TrampolineType = TrampolineType;
    }
});

module.exports = TrampolineContactDGEvent;