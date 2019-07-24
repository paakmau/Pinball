import RankController from './RankController'


/**
 * 管理游戏结束对话框的出现和隐藏
 * 
 * detailString :   内容 string 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/

var Alert = cc.Class({
    extends: cc.Component,
    properties: {
        detailLabel: cc.Label,
        cancelButton: cc.Node,
        cancelButtonText: cc.Label,
        shareButton: cc.Node,
        videoButton: cc.Node,
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
    showLoadingRank(detailStr, shareCallback) {
        this.configAlert(true, false, false, "确定", detailStr, shareCallback)
        this.rankController.initLoading()
        this.isShow = true
        this.isShowRankList = true
        // Loading 第一次打开排名前 this.isUploaded 为 false
        this.startFadeIn()
    },
    showGameOverWithoutRecover(detailString, mark, normalCallback) {
        this.resetGameOverDialog(false, detailString, mark, null, null, normalCallback)
    },
    showGameOverWithRecover(detailString, mark, shareCallback, videoCallback, normalCallback) {
        this.resetGameOverDialog(true, detailString, mark, shareCallback, videoCallback, normalCallback)
    },
    showGamePause(detailString, mark, normalCallback) {
        this.configAlert(false, false, true, "继续", detailString, null, null, normalCallback)
        // 设置mark
        this.rankController.initGamePause(mark)
        // 设置rank
        this.isShow = true
        this.isShowRankList = true
        this.startFadeIn()
    },
    resetGameOverDialog(withRecover, detailStr, mark, shareCallback, videoCallback, normalCallback) {
        this.configAlert(withRecover, withRecover, true, "下一局", detailStr, shareCallback, videoCallback, normalCallback)
        // 设置mark
        this.rankController.initGameOver(mark)
        // 因为分数未上传不能立刻设置rank
        this.isShow = true
        this.isShowRankList = true
        this.isUploaded = false
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
        if (this.normalCallback)
            this.normalCallback()
        this.startFadeOut()
    },
    onShareButtonClicked: function () {
        if (this.shareCallback)
            this.shareCallback()
        this.startFadeOut()
    },
    onVideoButtonClicked: function () {
        if (this.videoCallback)
            this.videoCallback()
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
    configAlert: function (hasShare, hasVideo, hasExit, cancelStr, detailStr, shareCallback, videoCallback, normalCallback) {
        // 分享与视频按钮
        if (this.shareButton)
            this.shareButton.active = hasShare
        if (this.videoButton)
            this.videoButton.active = hasVideo
        if (this.cancelButton)
            this.cancelButton.active = hasExit
        if (this.cancelButtonText)
            this.cancelButtonText.string = cancelStr

        // 回调
        this.shareCallback = shareCallback
        this.videoCallback = videoCallback
        this.normalCallback = normalCallback

        // 标题内容
        this.detailLabel.string = detailStr
    },
    update(dT) {
        if (this.isShowRankList != this.curIsShowRankList && this.isUploaded) {
            this.curIsShowRankList = this.isShowRankList
            this.setWorldRankShow()
        }
    },
})

module.exports = Alert