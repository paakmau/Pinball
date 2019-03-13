
var ChannelBonus = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.isActive = false;
        this.isActivePre = false;
    },

    update(dT) {
        if(this.isActive != this.isActivePre) {
            this.changeStateInView(this.isActive);
            this.isActivePre = this.isActive;
        }
    },

    // 由ChannalBonusGroup调用
    setGroup(group) {
        this.group = group;
    },

    onCollisionEnter() {
        this.isActive = !this.isActive;
        this.group.channelStateChange(this.isActive);
    },

    reset() {
        changeStateInView(false);
    },

    changeStateInView(isActive) {
        // TODO: 用动画或切图片改变通道状态
        cc.log("cnm : "+isActive);
    }
});

module.exports = ChannelBonus;