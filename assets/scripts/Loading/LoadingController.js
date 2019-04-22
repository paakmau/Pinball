import Alert from "../UI/Alert/Alert"

cc.Class({
    extends: cc.Component,

    properties: {
        progressBarSpeed: 100,
        progressBar: cc.Node,
        loadingLoading: cc.Node,
        loadingGameStart: cc.Node,
        gameStartBtn: cc.Button,
        alertDialog: Alert
    },

    onLoad () {
        var that = this
        cc.loader.downloader.loadSubpackage('res-package', err => {
            if(err)
                console.log(err)
            else {
                this.gameStartBtn.interactable = true
                this.loadingGameStart.active = true
                this.loadingLoading.active = false
            }
        })
        if(cc.sys.platform === cc.sys.WECHAT_GAME) {
            // 初始化微信云开发
            wx.cloud.init({
                traceUser: true,
                env: 'pinball-backend-345f5b'
            })
            // 用户登陆, 并获得最高分与排行榜
            this.openid = null
            wx.cloud.callFunction({
                name: 'login',
                success(res) {
                    that.openid = res.result.openid
                    that.uploadRankAndGetRank(that.openid, 0)
                }
            })
            // 向微信开放数据域传递进入游戏消息
            wx.postMessage({ type: 'GAME_START' })
        }
        this.progressOri = this.progressBar.x
        this.progress = 0
    },
    update(dT) {
        this.progress = this.progress + dT*this.progressBarSpeed
        while(this.progress>=30) {
            this.progress-=30
        }
        this.progressBar.x = this.progressOri + this.progress
    },
    uploadRankAndGetRank(openid, resultBonus) {
        var that = this
        wx.cloud.callFunction({
            name: 'uploadMark',
            data: {
                openid: openid,
                mark: resultBonus,
                topUserNum: 3, // 世界排名显示的前几名
                radiusFront: 1, // 玩家目前排名附近的其他玩家半径
                radiusBack: 2
            },
            success: that.onRecieveRank.bind(that)
        })
    },
    onRecieveRank(res) {
        let curRank = 1
        let myRank = res.result.rank
        const unknownNicknames = ['路人甲', '路人丙', '路人乙', '张三', '李四', '赵四', '王五', '卢本伟', '郭逢缘']
        res.result.topUsers.forEach(element => {
            if(curRank == myRank)
                element.nickname = "您"
            else
                element.nickname=unknownNicknames[Math.floor(Math.random() * (unknownNicknames.length-1))]
            curRank++
        })
        curRank = res.result.nearFrontRank
        res.result.nearUsers.forEach(element=>{
            if(curRank == myRank)
            element.nickname = "您"
            else
                element.nickname=unknownNicknames[Math.floor(Math.random() * (unknownNicknames.length-1))]
            curRank++
        })
        this.alertDialog.setWorldRank(res.result)
    },
    gameStart() {
        cc.director.loadScene('GameDemo')
    },
    showRank() {
        this.alertDialog.showLoadingRank("", null, false)
    },
    sharing() {
    }
});
