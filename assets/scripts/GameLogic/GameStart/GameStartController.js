/**
 * 检查小球发射状态的控制器
 */

var BallInCheck = require("./BallInCheck")
var BallOutCheck = require("./BallOutCheck")
var BallInGLEvent = require("../../Message/GameLogic/BallInGLEvent")
var BallOutGLEvent = require("../../Message/GameLogic/BallOutGLEvent")
var SpringToucher = require("../TouchInput/SpringToucher")
var RacketToucher = require("../TouchInput/RacketToucher")

cc.Class({
    extends: cc.Component,

    properties: {
        ballInCheck: BallInCheck,
        ballOutCheck: BallOutCheck,
        springToucher: SpringToucher,
        racketTouchers: {
            type: RacketToucher,
            default: []
        }
    },
    
    onLoad() {
        var that = this

        // 检查小球进入隧道
        this.node.on(BallInGLEvent.Name, function(event) {
            that.ballInCheck.setActive(false)
            that.ballOutCheck.setActive(true)
            that.springToucher.setActive(true)
            that.racketTouchers.forEach(toucher => {
                toucher.setActive(false)
            })
        })
        // 小球离开隧道
        this.node.on(BallOutGLEvent.Name, function(event) {
            that.ballInCheck.setActive(true)
            that.ballOutCheck.setActive(false)
            that.springToucher.setActive(false)
            that.racketTouchers.forEach(toucher => {
                toucher.setActive(true)
            })
        })
    }
});
