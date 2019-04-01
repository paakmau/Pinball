

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onScrollBarDrag, this)
    },

    onClickFriendMode() {
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
            wx.postMessage({ type: 'CHANGE_RANK_LIST' , isFriendMode: true })
    },

    onClickWorldMode() {
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
            wx.postMessage({ type: 'CHANGE_RANK_LIST' , isFriendMode: false })
    },

    onScrollBarDrag(event) {
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
            wx.postMessage({ type: 'SCROLL_BAR_DRAG' , deltaY: event.getDeltaY() })
    }
});
