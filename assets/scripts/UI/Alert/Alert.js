import RankController from './RankController'


/**
 * 管理游戏结束对话框的出现和隐藏
 * 
 * detailString :   内容 string 类型.
 * exitCallBack:    退出事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/

var Alert = cc.Class({
    extends: cc.Component,
    properties: {
        detailLabel: cc.Label,
        cancelButton: cc.Node,
        enterButton: cc.Node,
        outBackground: cc.Node,
        animSpeed: 0.5,
        rankController: RankController
    },
    onLoad() {
        this.isShow = false
        this.isUploaded = false
        this.isShowRankList = false
        this.curIsShowRankList = false
        var self = this
        Alert._alert = this

        // 配置动画
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self)
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self)
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(self.animSpeed, 255), cc.scaleTo(self.animSpeed, 1.0)), cbFadeIn)
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(self.animSpeed, 0), cc.scaleTo(self.animSpeed, 1.2)), cbFadeOut)
    },
    showLoadingRank(detailStr, exitCallBack) {
        this.configAlert(detailStr, exitCallBack, false)
        this.rankController.initLoading()
        this.isShow = true
        this.isShowRankList = true
        // Loading 第一次打开排名前 this.isUploaded 为 false
        this.startFadeIn()
    },
    showGameOver(detailString, exitCallBack, mark) {
        this.configAlert(detailString, exitCallBack, false)
        // 设置mark
        this.rankController.initGameOver(mark)
        // 因为分数未上传不能立刻设置rank
        this.isShow = true
        this.isShowRankList = true
        this.isUploaded = false
        this.startFadeIn()
    },
    showGamePause(detailString, exitCallBack, mark) {
        this.configAlert(detailString, exitCallBack, false)
        // 设置mark
        this.rankController.initGamePause(mark)
        // 设置rank
        this.isShow = true
        this.isShowRankList = true
        this.startFadeIn()
    },
    setWorldRank(worldRankData) {
        // 服务器返回最高分与世界排名信息
        this.isUploaded = true
        this.worldRankData = worldRankData
    },
    setWorldRankShow() {
        if (this.isShow)
            this.rankController.setWorldRank(this.worldRankData)
        else
            this.rankController.releaseRankList()
    },
    onExitButtonClicked: function (event) {
        if (event.currentTarget == this.enterButton)
            this.sharing ()
        if (this.exitCallBack)
            this.exitCallBack()
        this.startFadeOut()
    },
    // 执行弹进动画
    startFadeIn: function () {
        // cc.eventManager.pauseTarget(this, true)
        this.node.position = cc.v2(0, 0)
        this.node.setScale(1.2)
        this.node.opacity = 0
        this.node.runAction(this.actionFadeIn)
    },
    // 执行弹出动画
    startFadeOut: function () {
        // cc.eventManager.pauseTarget(this, true)
        this.node.runAction(this.actionFadeOut)
    },
    // 弹进动画完成回调
    onFadeInFinish: function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_PAUSE' })
        }
        // cc.eventManager.resumeTarget(this, true)
    },
    // 弹出动画完成回调
    onFadeOutFinish: function () {
        this.node.position = cc.v2(10000, 10000)
        this.isShowRankList = false
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_RESUME' })
        }
    },
    configAlert: function (detailString, exitCallBack, needCancel) {

        // 回调
        this.exitCallBack = exitCallBack

        // 内容
        this.detailLabel.string = detailString

        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) { // 显示
            this.cancelButton.active = true
        } else {  // 隐藏
            this.cancelButton.active = false
            this.enterButton.x = 0
        }
    },
    update(dT) {
        if (this.isShowRankList != this.curIsShowRankList && this.isUploaded) {
            this.curIsShowRankList = this.isShowRankList
            this.setWorldRankShow()
        }
    },
    sharing() {
        //主动拉起分享接口
        cc.loader.loadRes("share.jpg", function(err, data) {
            wx.shareAppMessage({
                title: "寻找童年回忆 是兄弟就来弹我！",
                imageUrl: data.url
            })
        });
    }
})

module.exports = Alert