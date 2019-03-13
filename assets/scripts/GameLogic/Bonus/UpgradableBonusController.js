/**
 * 可升级Bonus组控制器
 */

var UpgradableBonus = require("./UpgradableBonus");
var UpgradableBonusUpgrader = require("./UpgradableBonusUpgrader");

var BonusGainGLEvent = require("../../Message/GameLogic/BonusGainGLEvent");
var UpgradableBonusUpgradeGLEvent = require("../../Message/GameLogic/UpgradableBonusUpgradeGLEvent");

var UpgradableBonusController = cc.Class({
    extends: cc.Component,
    properties: {
        upgradableBonusArray: {
            type: UpgradableBonus,
            default: []
        },
        upgraderArray: {
            type: UpgradableBonusUpgrader,
            default: []
        },
        bonusFactorArray: {
            type: cc.Integer,
            default: []
        },
        upgraderBonusFactor: 200
    },

    onLoad () {
        this.upgradableBonusArray.forEach(bonus => {
            bonus.setController(this);
        });
        this.upgraderArray.forEach(upgrader => {
            upgrader.setController(this);
        });
        this.level = 0;
        this.activeNum = 0;
    },

    bonusGain() {
        var event = new BonusGainGLEvent();
        event.init(this.bonusFactorArray[this.level]);
        this.node.dispatchEvent(event);
    },

    upgraderBonusGain() {
        var event = new BonusGainGLEvent();
        event.init(this.upgraderBonusFactor);
        this.node.dispatchEvent(event);
    },

    statusChange(isActive) {
        if(isActive) {
            this.activeNum ++;
            if(this.activeNum == this.upgraderArray.length) {
                this.activeNum = 0;
                this.level++;
                this.upgraderArray.forEach(upgrader => {
                    upgrader.resetInView();
                });
                this.upgradableBonusArray.forEach(bonus => {
                    bonus.upgradeInView();
                });

                // 发送升级事件
                var event = new UpgradableBonusUpgradeGLEvent();
                event.init("UpCircleGroupPart", this.level);
                this.node.dispatchEvent(event);
            }
        }
        else
            this.activeNum --;
    }
});


module.exports = UpgradableBonusController;