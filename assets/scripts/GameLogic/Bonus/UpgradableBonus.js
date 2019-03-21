

var UpgradableBonus = cc.Class({
    extends: cc.Component,

    properties: {
    },

    setController(controller) {
        this.controller = controller
    },

    upgradeInView() {
        // TODO: 升级Bonus, 播放动画, 并更改贴图
    },

    onBeginContact() {
        this.controller.bonusGain()
    }
})

module.exports = UpgradableBonus