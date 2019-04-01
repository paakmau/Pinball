import WorldRankListController from "./WorldRankListController"
import UserApi from '../../Api/User'

cc.Class({
    extends: cc.Component,

    properties: {
        worldRankListController: WorldRankListController
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
        // 向微信开放数据域传递分数数据
        if(cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_OVER' , mark: this.mark })
        }
        // 向世界发送数据 TODO:
        UserApi.RegisterOrLoginByWxId("hbmnb", resId=>{

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
