
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.animation = this.getComponent(cc.Animation)
    },

    onCollisionEnter() {
        // 播放对应动画
        // TODO: 目前默认动画都是碰撞
        this.animation.play()
    },

    onBeginContact() {
        this.animation.play()
    }
})
