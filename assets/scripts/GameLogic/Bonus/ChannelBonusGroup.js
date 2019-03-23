/**
 * 通道组加分器
 * 一组有若干个通道, 每个通道有一个状态 false 或 true (inactive, active), 初始为 false
 * 小球每经过一次通道将会把通道状态取反
 * 当所有通道的状态为true时, 全部重置为false, 并加分
 */

var BonusGainGLEvent = require("../../Message/GameLogic/BonusGainGLEvent")
var ChannelBonus = require("./ChannelBonus")

cc.Class({
    extends: cc.Component,

    properties: {
        channelBonusArray: {
            type: ChannelBonus,
            default: []
        },
        bonusFactor: 10000
    },

    onLoad () {
        this.activeChannelNum = 0
        this.channelBonusArray.forEach(channelBonus => {
            channelBonus.setGroup(this)
        })
    },

    reset() {
        // TODO: 应当播放成功动画
        this.activeChannelNum = 0
        this.channelBonusArray.forEach(channelBonus => {
            channelBonus.reset()
        })
    },

    channelStateChange(state) {
        if(state) {
            this.activeChannelNum ++
            if(this.activeChannelNum == this.channelBonusArray.length) {
                this.reset()

                // 发送BonusGain消息
                var event = new BonusGainGLEvent()
                event.init(this.bonusFactor)
                this.node.dispatchEvent(event)
            }
        }
        else
            this.activeChannelNum --
    }
})
