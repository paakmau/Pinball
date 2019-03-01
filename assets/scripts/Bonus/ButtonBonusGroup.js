
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
            this.node.emit("bonus_gain", this.bonusFactor); // TODO: 应当使用消息系统
        }
    }
});

module.exports = ButtonBonusGroup;