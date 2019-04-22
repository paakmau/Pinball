import WorldRankListController from "./WorldRankListController"

/**
 * 负责向后端上传数据, 从后端接收排行榜
 * 管理好友排名与世界排名的切换
 */

cc.Class({
    extends: cc.Component,

    properties: {
        worldRankListController: WorldRankListController,
        worldMark: cc.Label,
        friendRankList: cc.Node
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onScrollBarDrag, this)
        this.friendChild = this.node.getChildByName("friendRankList")
        this.worldChild = this.node.getChildByName("worldRankList")
        this.friendChildPos = cc.v2(0, 0)
        this.worldChildPos = cc.v2(0, 0)
        this.mark = null
        this.maxMark = null
    },
    initLoading() {
        this.mark = 0
        this.worldMark.string = "您的最高分..."
        this.maxMark = 0
    },
    initGameOver(mark) {
        this.mark = mark
        // 显示分数, 上传并获得最高分之前
        this.worldMark.string = "上局得分 " + this.mark + ", 最高分 ..."
        this.maxMark = 0
    },
    initGamePause() {
        if(this.mark != null) {
            if(this.maxMark != null) {
                // 显示上一局的游戏信息
                this.worldMark.string = "上局得分 " + this.mark + ", 最高分 " + this.maxMark
            }
            else {
                // 上一局未能上传成功
                this.worldMark.string = "上局得分 " + this.mark + ", 最高分..."
            }
        }else {
            if(this.maxMark != null) {
                // 第一局, 已获得最高分与List
                this.worldMark.string = "您的最高分是 " + this.maxMark
            }
            else {
                // 第一局获得最高分之前
                this.worldMark.string = "您的最高分 ..."
            }
        }
    },
    setWorldRank(worldRankData) {
        if(this.maxMark == null) {
            this.worldMark.string = "您的最高分是 " + worldRankData.maxMark
        }else {
            this.worldMark.string = "上局得分 " + this.mark + ", 最高分 " + worldRankData.maxMark
        }
        this.maxMark = worldRankData.maxMark
        this.worldRankListController.setUserData(worldRankData.topUsers, worldRankData.nearUsers, worldRankData.nearFrontRank)
    },
    releaseRankList() {
        this.worldRankListController.resetUserData()
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
