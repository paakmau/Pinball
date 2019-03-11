/**
 * 蹦床触发事件
 * 属性 trampolineType指明是哪一种蹦床
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
    init: function(trampolineType) {
        this.type = eventName;
        this.bubbles = true;
        this.trampolineType = trampolineType;
    }
});

module.exports = TrampolineContactDGEvent;