
var UpgradableBonusUpgrader = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.isActive = false
        this.isActivePre = false
    },
    setController(controller) {
        this.controller = controller
    },

    update (dt) {
        if(this.isActive != this.isActivePre) {
            this.isActivePre = this.isActive
        // TODO: 此处应当播放动画
            if(this.isActive)
                this.node.color = new cc.Color(255, 84, 0)
            else
                this.node.color = new cc.color(255, 255, 255)
        }
    },

    onCollisionEnter() {
        if(this.isActive == false) {
            this.isActive = true
            this.controller.statusChange(this.isActive)
        }
        this.controller.upgraderBonusGain()
    },

    resetInView() {
        // TODO: 此处应当播放动画
        this.isActive = false
    },
    reset(){
        this.node.color = new cc.Color(255, 255, 255);
        this.isActive = false
        this.isActivePre = false
    }
})

module.exports = UpgradableBonusUpgrader