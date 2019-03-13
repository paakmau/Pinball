
var UpgradableBonusUpgrader = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.isActive = false;
        this.isActivePre = false;
    },
    setController(controller) {
        this.controller = controller;
    },

    update (dt) {
        if(this.isActive != this.isActivePre) {
            this.isActivePre = this.isActive;
        // TODO: 此处应当播放动画
            if(this.isActive)
                this.node.color = new cc.Color(255, 84, 0);
            else
                this.node.color = new cc.color(255, 255, 255);
        }
    },

    onCollisionEnter() {
        this.isActive = !this.isActive;
        this.controller.upgraderBonusGain();
        this.controller.statusChange(this.isActive);
    },

    resetInView() {
        // TODO: 此处应当播放动画
        this.isActive = false;
    }
});

module.exports = UpgradableBonusUpgrader;