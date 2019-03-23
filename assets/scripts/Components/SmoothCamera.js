/**
 * 平滑摄像机
 * 跟随Target移动
 * 自动获取Canvas的大小与自身Zoom Ratio防止出界
 *  需要Canvas锚点为(0.5, 0.5), 不可缩放
 * 平滑系数: smoothFact
 */


cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        smoothFact: 8
    },

    onLoad() {
        let width = cc.game.canvas.width
        let height = cc.game.canvas.height
        let zoomRatio = this.getComponent(cc.Camera).zoomRatio
        this.maxRight = (width-width/zoomRatio)/2
        this.maxTop = (height-height/zoomRatio)/2
    },

    update (dt) {
        let targetX = Math.max(Math.min(this.target.x, this.maxRight), -this.maxRight)
        let targetY = Math.max(Math.min(this.target.y, this.maxTop), -this.maxTop)
        this.node.x = cc.misc.lerp(this.node.x, targetX, dt*this.smoothFact)
        this.node.y = cc.misc.lerp(this.node.y, targetY, dt*this.smoothFact)
    }
})
