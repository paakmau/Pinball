
cc.Class({
    extends: cc.Component,

    properties: {
        additionNode: cc.Node
    },

    onLoad () {
        this.animations = [this.getComponent(cc.Animation)]
        if(this.additionNode != null)
            this.animations.push(this.additionNode.getComponent(cc.Animation))
    },

    onCollisionEnter() {
        // 播放默认动画
        this.animations.forEach(element => {
            element.play()
        });
    },

    onBeginContact() {
        this.animations.forEach(element => {
            element.play()
        });
    }
})
