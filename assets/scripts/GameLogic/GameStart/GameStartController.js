/**
 * 检查小球发射状态的控制器
 */

var BallInCheck = require("./BallInCheck")
var BallOutCheck = require("./BallOutCheck")
var BallInOutGLEvent = require("../../Message/GameLogic/BallInOutGLEvent")
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

        // // 检查小球进入或离开隧道
        // this.node.on(BallInOutGLEvent.Name, function(event) {
        //     let isIn = event.isIn
        //     that.ballInCheck.setActive(!isIn)
        //     that.ballOutCheck.setActive(isIn)
        //     that.springToucher.setActive(isIn)
        //     that.racketTouchers.forEach(toucher => {
        //         toucher.setActive(!isIn)
        //     })
        // })
        //直接当作离开隧道
        that.springToucher.setActive(true)
        that.racketTouchers.forEach(toucher => {
            toucher.setActive(true)
        })
    }
});
