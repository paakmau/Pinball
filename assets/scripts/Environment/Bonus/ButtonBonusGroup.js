
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
            // TODO: 应当使用消息系统
            cc.director.emit("bonus_gain", this.bonusFactor);
        }
    }
});

module.exports = ButtonBonusGroup;