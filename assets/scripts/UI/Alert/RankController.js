import WorldRankListController from "./WorldRankListController"

/**
 * 负责向后端上传数据, 从后端接收排行榜
 * 管理好友排名与世界排名的切换
 */

cc.Class({
    extends: cc.Component,

    properties: {
        worldRankListController: WorldRankListController,
        worldTopLabel: cc.Label,
        friendRankList: cc.Node
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onScrollBarDrag, this)
        this.friendChild = this.node.getChildByName("friendRankList")
        this.worldChild = this.node.getChildByName("worldRankList")
        this.friendChildPos = cc.v2(0, 0)
        this.worldChildPos = cc.v2(0, 0)
    },

    init(mark) {
        this.mark = mark

        // 向微信开放数据域传递分数数据
        if(cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_OVER' , mark: this.mark })
        }
        // 设置世界排名显示
        this.worldTopLabel.string = "您的得分是 " + this.mark + '...'
    },
    fade() {
    },
    setWorldRank(worldRankData) {
        this.worldTopLabel.string = "您的得分是 " + this.mark + ' 最高分 ' + worldRankData.maxMark
        this.worldRankListController.setUserData(worldRankData.topUsers, worldRankData.nearUsers, worldRankData.nearFrontRank)
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
