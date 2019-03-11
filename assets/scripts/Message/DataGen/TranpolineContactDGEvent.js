/**
 * 蹦床触发事件
 * 属性 tranpolineType指明是哪一种蹦床
 */

var eventName = "TranpolineContactDG";

var TranpolineContactDGEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName,
        TranpolineType: {
            // bomb的类型
            RectTrampoline: "RectTrampoline",
            CircleTrampoline: "CircleTrampoline",
            ShootTrampoline: "ShootTrampoline",
            StartBomb: "StartBomb"
        }
    },
    properties: {
    },
    init: function(tranpolineType) {
        this.type = eventName;
        this.bubbles = true;
        this.tranpolineType = tranpolineType;
    }
});

module.exports = TranpolineContactDGEvent;