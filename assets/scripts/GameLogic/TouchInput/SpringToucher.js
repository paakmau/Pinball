
/**
 * 负责监听弹簧触摸事件
 */

let Spring = require('../GameStart/Spring')

var SpringToucher = cc.Class({
    extends: cc.Component,
    properties: {
        springObj: Spring
    },
    onLoad(){
        // 监听触摸事件
        this.node.on('touchstart', this.springDown, this)
        this.node.on('touchcancel', this.springUp, this)
        this.node.on('touchend', this.springUp, this)
    },
    springDown() {
        this.springObj.springDown()
    },
    springUp() {
        this.springObj.springUp()
    },
    setActive(value) {
        this.node.active = value
    }
})

module.exports = SpringToucher