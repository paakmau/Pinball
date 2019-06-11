import Alert from "./Alert/Alert"
var Ad = require("../Ad/ad")

var UIController = cc.Class({
    extends: cc.Component,
    properties:{
        Bonus: {
            default: null,
            type: cc.Label
        },
        alertDialog: Alert
    },
    onLoad(){
        this.mark = 0
        this.setBonus(this.mark)
        // 加载广告
        var comm = Ad
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
            });
            comm.bannerAd.onError(function (res) {
                console.log(res);
            })
        }
    },
    //设置bonus的值。value为int类型
    setBonus(value){
        this.Bonus.string = '得分:  ' + value
        this.mark = value
    },
    gameOver(mark) {
        this.alertDialog.showGameOver("游戏结束", this.gameResume, mark)
        Ad.bannerAd.show()
    },
    setWorldRank(worldRankData) {
        this.alertDialog.setWorldRank(worldRankData)
    },
    showRank(callback) {
        this.alertDialog.showGamePause("游戏暂停", callback, this.mark)
    },
    gameResume () {
        Ad.bannerAd.hide()
    }
})

module.exports = UIController