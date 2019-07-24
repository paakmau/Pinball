import Alert from "./Alert/Alert"
var Ad = require("./Ad")

var UIController = cc.Class({
    extends: cc.Component,
    properties: {
        Bonus: {
            default: null,
            type: cc.Label
        },
        alertDialog: Alert
    },
    onLoad() {
        var that = this;
        this.mark = 0
        this.setBonus(this.mark)
        // 加载广告
        var comm = Ad
        this.videoCallback = null
        this.normalCallback = null
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            // 手机屏幕信息
            let winSize = wx.getSystemInfoSync();
            comm.windowWidth = winSize.windowWidth;
            comm.windowHeight = winSize.windowHeight;
            console.log(comm.windowWidth, comm.windowHeight);
            // 广告1和2
            if (comm.bannerAd == null) {
                // 广告
                comm.bannerAd = window.wx.createBannerAd({
                    adUnitId: 'adunit-2eb292b97ccde5a6',
                    style: {
                        left: comm.windowWidth / 2 - 150,
                        top: comm.windowHeight - 90,
                        width: 300,
                    }
                })
                comm.bannerAd.onResize(() => {
                    comm.bannerAd.style.left = comm.windowWidth / 2 - 150 + 0.1;
                    comm.bannerAd.style.top = comm.windowHeight - comm.bannerAd.style.realHeight + 0.1;
                })
                comm.bannerAd.onError(function (res) {
                    console.log(res);
                })
            }
            // 视频广告
            if (comm.videoBar_1 == null) {
                comm.videoBar_1 = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-14672b9c5ad64478'
                })
                comm.videoBar_1.onError(function (res) {
                    console.log("video_1", res);
                })
                comm.videoBar_1.onLoad(() => {
                    console.log('复活激励视频 广告加载成功')
                })
                comm.videoBar_1.onClose(res => {
                    console.log('第一个视频回调')
                    if (res && res.isEnded || res === undefined) {
                        console.log("复活视频看完")
                        if (that.videoCallback)
                            that.videoCallback()
                    } else {
                        console.log("复活视频被终止")
                        if (that.normalCallback)
                            that.normalCallback()
                    }
                })
            }
        }
    },
    //设置bonus的值。value为int类型
    setBonus(value) {
        this.Bonus.string = '得分:  ' + value
        this.mark = value
    },
    gameOverWithRecover(mark, shareCallback, videoCallback, normalCallback) {
        this.alertDialog.showGameOverWithRecover(
            "游戏结束",
            mark,
            () => {
                Ad.bannerAd.hide()
                //主动拉起分享接口
                cc.loader.loadRes("share.jpg", function (err, data) {
                    wx.shareAppMessage({
                        title: "寻找童年回忆 是兄弟就来弹我！",
                        imageUrl: data.url
                    })
                })
                shareCallback()
            },
            () => {
                Ad.bannerAd.hide()
                this.videoCallback = videoCallback
                this.normalCallback = normalCallback
                Ad.videoBar_1.load()
                    .then(() => Ad.videoBar_1.show())
                    .catch(err => console.log(err.errMsg))
            },
            () => {
                Ad.bannerAd.hide()
                normalCallback()
            }
        )
        Ad.bannerAd.show()
    },
    gameOverWithoutRecover(mark, normalCallback) {
        this.alertDialog.showGameOverWithoutRecover("游戏结束", mark, () => {
            Ad.bannerAd.hide()
            normalCallback()
        })
        Ad.bannerAd.show()
    },
    setWorldRank(worldRankData) {
        this.alertDialog.setWorldRank(worldRankData)
    },
    showRank(callback) {
        this.alertDialog.showGamePause("游戏暂停", this.mark, callback)
    }
})

module.exports = UIController