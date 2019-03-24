
/**
 * 负责监听弹簧触摸事件
 */

let Racket = require('../Racket')

cc.Class({
    extends: cc.Component,
    properties: {
        racketObj: Racket
    },
    onLoad(){
        // 监听触摸事件
        this.node.on('touchstart', this.touchDown, this)
        this.node.on('touchcancel', this.touchUp, this)
        this.node.on('touchend', this.touchUp, this)
    },
    touchDown(){
        this.racketObj.setRotate(true)
    },
    touchUp(){
        this.racketObj.setRotate(false)
    }
})