/**
 * 按钮组类型Bonus
 * 当所有按钮都被按下时获得Bonus, 并恢复所有按钮到未按下状态
 * 要求Enable Contact
 */

var BonusGainGLEvent = require("../../Message/GameLogic/BonusGainGLEvent")
var ButtonBonus = require("./ButtonBonus");

var ButtonBonusGroup = cc.Class({
    extends: cc.Component,
    properties: {
        buttonBonusArray: {
            type: ButtonBonus,
            default: []
        },
        bonusFactor: 10000
    },

    onLoad() {
        this.pressedBtnNum = 0;
        this.buttonBonusArray.forEach(btnBonus => {
            btnBonus.setGroup(this);
        });
    },

    reset() {
        this.pressedBtnNum = 0;
        this.buttonBonusArray.forEach(btnBonus => {
            btnBonus.reset();
        });
    },

    pressDownOneBtn() {
        this.pressedBtnNum ++;
        if(this.pressedBtnNum == this.buttonBonusArray.length) {
            this.reset();
            
            // 发送Bonus获得消息
            var event = new BonusGainGLEvent();
            event.init(this.bonusFactor);
            this.node.dispatchEvent(event);
        }
    }
});

module.exports = ButtonBonusGroup;