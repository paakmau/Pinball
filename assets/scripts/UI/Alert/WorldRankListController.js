

var WorldRankListController = cc.Class({
    extends: cc.Component,

    properties: {
        friendItemPrefab: cc.Prefab
    },

    onLoad() {
        this.scrollView = this.getComponent(cc.ScrollView)
        this.scrollContent = this.getComponent(cc.ScrollView).content;
        this.friendItemList = new Array()
    },

    setFriendData(friendList) {
        this.friendItemList.forEach(element => {
            element.destroy()
        })
        this.friendItemList.length = 0
        var rank = 0
        friendList.forEach(element => {
            rank ++
            var item = cc.instantiate(this.friendItemPrefab)
            item.getComponent('FriendItem').init(rank, element.nickname, element.mark)
            this.friendItemList.push(item)
        });
        this.friendItemList.forEach(element => {
            this.scrollContent.addChild(element)
        })
    },

    scrollBarDrag(deltaY) {
        this.scrollView.scrollToOffset(this.scrollView.getScrollOffset().add(cc.v2(0, deltaY)))
    }
});


module.exports = WorldRankListController