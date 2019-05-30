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
                this.progressBar.active = false
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

            // 生成获取微信授权隐形按钮
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                let exportJson = {};
                let sysInfo = window.wx.getSystemInfoSync();
                //获取微信界面大小
                let width = sysInfo.screenWidth;
                let height = sysInfo.screenHeight;
                window.wx.getSetting({
                    success (res) {
                        console.log(res.authSetting);
                        if (res.authSetting["scope.userInfo"]) {
                            console.log("用户已授权");
                            window.wx.getUserInfo({
                                success(res){
                                    console.log(res);
                                    exportJson.userInfo = res.userInfo;
                                    // 登陆
                                    that.login (res.userInfo.nickName)
                                }
                            });
                        }else {
                            console.log("用户未授权");
                            let button = window.wx.createUserInfoButton({
                                type: 'text',
                                text: '',
                                style: {
                                    left: 0,
                                    top: 0,
                                    width: width,
                                    height: height,
                                    backgroundColor: '#00000000',//最后两位为透明度
                                    color: '#ffffff',
                                    fontSize: 20,
                                    textAlign: "center",
                                    lineHeight: height,
                                }
                            });
                            button.onTap((res) => {
                                if (res.userInfo) {
                                    console.log("用户授权:", res);
                                    exportJson.userInfo = res.userInfo;
                                    // 登陆
                                    that.login (res.userInfo.nickName)
                                    button.destroy();
                                }else {
                                    console.log("用户拒绝授权:", res);
                                    // 匿名登陆
                                    that.login (null)
                                    button.destroy();
                                }
                            });
                        }
                    }
                })
            }

            // 向微信开放数据域传递进入游戏消息
            wx.postMessage({ type: 'GAME_START' })

            // 初始化分享
            wx.showShareMenu();
            cc.loader.loadRes("share.jpg", function(err, data) {
                wx.onShareAppMessage(() => ({
                    title: "太空弹珠台",
                    imageUrl: data.url
                }))
            })
        }
        this.progressOri = this.progressBar.x
        this.progress = 0
    },
    login (nickName) {
        let that = this
        // 用户登陆, 并获得最高分与排行榜
        this.openid = null
        wx.cloud.callFunction({
            name: 'login',
            data: {
                nickName
            },
            success(res) {
                that.openid = res.result.openid
                that.uploadRankAndGetRank(that.openid, 0)
            }
        })
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
        this.alertDialog.showLoadingRank("", null, true)
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
});
