import WorldRankListController from "./WorldRankListController"
import UserApi from '../../Api/User'

/**
 * 负责向后端上传数据, 从后端接收排行榜
 * 管理好友排名与世界排名的切换
 */

cc.Class({
    extends: cc.Component,

    properties: {
        worldRankListController: WorldRankListController,
        worldTopLabel: cc.Label
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onScrollBarDrag, this)
        this.friendChild = this.node.getChildByName("friendRankList")
        this.worldChild = this.node.getChildByName("worldRankList")
        this.friendChildPos = this.friendChild.position
        this.worldChildPos = this.worldChild.position
    },

    init(mark) {
        this.mark = mark
    },

    start() {
        let that = this
        // 向微信开放数据域传递分数数据
        if(cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_OVER' , mark: this.mark })
        }
        // 设置世界排名显示
        this.worldTopLabel.string = "您的得分是 " + this.mark + '...'
        // 向世界发送数据 TODO:
        UserApi.RegisterOrLoginByWxId("hbmdeidididididid", "hbm", resId=>{
            console.log(resId)
            UserApi.UpdateScoreById( resId, that.mark, 3, 2, 1, resUpdate=>{
                console.log(resUpdate)
                resUpdate.topUsers.forEach(e => {
                    e.nickname = e.wxName
                    e.mark = e.highestScore
                });
                resUpdate.nearUsers.forEach(e => {
                    e.nickname = e.wxName
                    e.mark = e.highestScore
                });
                this.worldTopLabel.string = "您的得分是 " + this.mark + ' 最高分 ' + resUpdate.highestScore
                this.worldRankListController.setUserData(resUpdate.topUsers, resUpdate.nearUsers, resUpdate.rank)
            })
        })
        this.onClickFriendMode()
    },

    onClickFriendMode() {
        this.isFriendMode = true
        this.friendChild.position = this.friendChildPos
        this.worldChild.position = cc.v2(10000, 10000)
    },

    onClickWorldMode() {
        this.isFriendMode = false
        this.friendChild.position = cc.v2(10000, 10000)
        this.worldChild.position = this.worldChildPos
    },

    onScrollBarDrag(event) {
        if(this.isFriendMode) {
            if(cc.sys.platform === cc.sys.WECHAT_GAME)
                wx.postMessage({ type: 'SCROLL_BAR_DRAG' , deltaY: event.getDeltaY() })
        }
        else
            this.worldChild
    }
});
