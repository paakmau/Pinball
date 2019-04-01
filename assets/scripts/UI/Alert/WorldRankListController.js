

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

    setUserData(topUserList, nearUserList, nearRankFront) {
        this.friendItemList.forEach(element => {
            element.destroy()
        })
        this.friendItemList.length = 0
        var rank = 0
        topUserList.forEach(element => {
            rank ++
            var item = cc.instantiate(this.friendItemPrefab)
            item.getComponent('RankItem').init(rank, element.nickname, element.mark)
            this.friendItemList.push(item)
            this.scrollContent.addChild(item)
        });
        var empty = cc.instantiate(this.emptyItemPrefab)
        this.friendItemList.push(empty)
        this.scrollContent.addChild(empty)
        if(nearUserList.length != 0) {
            rank = nearRankFront - 1
            nearUserList.forEach(element => {
                rank++
                var item = cc.instantiate(this.friendItemPrefab)
                item.getComponent('RankItem').init(rank, element.nickname, element.mark)
                this.friendItemList.push(item)
                this.scrollContent.addChild(item)
            });
            var empty = cc.instantiate(this.emptyItemPrefab)
            this.friendItemList.push(empty)
            this.scrollContent.addChild(empty)
        }
    },

    scrollBarDrag(deltaY) {
        this.scrollView.scrollToOffset(this.scrollView.getScrollOffset().add(cc.v2(0, deltaY)))
    }
});


module.exports = WorldRankListController