
/**
 * 管理世界排名的显示
 */


var WorldRankListController = cc.Class({
    extends: cc.Component,

    properties: {
        friendItemPrefab: cc.Prefab,
        emptyItemPrefab: cc.Prefab
    },

    onLoad() {
        this.scrollView = this.getComponent(cc.ScrollView)
        this.scrollContent = this.getComponent(cc.ScrollView).content;
        this.friendItemList = new Array()
    },

    setUserData(topUserList, nearUserList, nearFrontRank) {
        this.friendItemList.forEach(element=>{
            element.destroy()
        })
        this.friendItemList.length = 0
        var rank = 0
        topUserList.forEach(element => {
            rank ++
            var item = cc.instantiate(this.friendItemPrefab)
            this.setFriendItem(item, rank, element.nickname, element.mark)
            this.friendItemList.push(item)
            this.scrollContent.addChild(item)
        });
        var empty = cc.instantiate(this.emptyItemPrefab)
        this.friendItemList.push(empty)
        this.scrollContent.addChild(empty)
        if(nearUserList.length != 0) {
            rank = nearFrontRank - 1
            nearUserList.forEach(element => {
                rank++
                var item = cc.instantiate(this.friendItemPrefab)
                this.setFriendItem(item, rank, element.nickname, element.mark)
                this.friendItemList.push(item)
                this.scrollContent.addChild(item)
            });
            empty = cc.instantiate(this.emptyItemPrefab)
            this.friendItemList.push(empty)
            this.scrollContent.addChild(empty)
        }
        empty = cc.instantiate(this.emptyItemPrefab)
        this.friendItemList.push(empty)
        this.scrollContent.addChild(empty)
    },
    resetUserData() {
        this.friendItemList.forEach(element=>{
            element.destroy()
        })
        this.friendItemList.length = 0
    },

    scrollBarDrag(deltaY) {
        this.scrollView.scrollToOffset(this.scrollView.getScrollOffset().add(cc.v2(0, deltaY)))
    },

    setFriendItem(itemNode, rank, nickname, mark) {
        itemNode.getChildByName('Rank').getComponent(cc.Label).string = rank
        itemNode.getChildByName('Nickname').getComponent(cc.Label).string = nickname
        itemNode.getChildByName('Mark').getComponent(cc.Label).string = mark
    }
});


module.exports = WorldRankListController