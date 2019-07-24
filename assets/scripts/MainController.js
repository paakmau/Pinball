
import AudioPlayer from "./Utils/AudioPlayerUtil"
var BallFallDGEvent = require("./Message/DataGen/BallFallDGEvent")
var BonusGainDGEvent = require("./Message/DataGen/BonusGainDGEvent")
var PortalContactDGEvent = require("./Message/DataGen/PortalContactGLEvent")
var TrampolineContactDGEvent = require("./Message/DataGen/TrampolineContactDGEvent")
var BallStartShootDGEvent = require("./Message/DataGen/BallStartShootDGEvent")
var DataContainer = require("./Data/DataContainer")
var UIController = require("./UI/UIController")
var AudioController = require("./Audio/AudioController")
var GameManager = require("./GameLogic/GameManager")

cc.Class({
    extends: cc.Component,
    properties: {
        gameData: {
            default: null,
            type: DataContainer
        },
        gameUI: {
            default: null,
            type: UIController
        },
        gameAudio: {
            default: null,
            type: AudioController
        },
        gameManager: GameManager
    },
    onLoad() {
        var that = this
        this.gameData.resetData()
        AudioPlayer.init(this.gameAudio)

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // 初始化微信云开发
            wx.cloud.init({
                traceUser: true,
                env: 'pinball-backend-345f5b'
            })
            // 生成获取微信用户名授权隐形按钮
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                let exportJson = {};
                let sysInfo = window.wx.getSystemInfoSync();
                //获取微信界面大小
                let width = sysInfo.screenWidth;
                let height = sysInfo.screenHeight;
                window.wx.getSetting({
                    success(res) {
                        console.log(res.authSetting);
                        if (res.authSetting["scope.userInfo"]) {
                            console.log("用户已授权");
                            window.wx.getUserInfo({
                                success(res) {
                                    console.log(res);
                                    exportJson.userInfo = res.userInfo;
                                    // 登陆
                                    that.login(res.userInfo.nickName)
                                }
                            });
                        } else {
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
                                    that.login(res.userInfo.nickName)
                                    button.destroy();
                                } else {
                                    console.log("用户拒绝授权:", res);
                                    // 匿名登陆
                                    that.login(null)
                                    button.destroy();
                                }
                            });
                        }
                    }
                })
            }
            // 向微信开放数据域传递进入游戏消息
            wx.postMessage({ type: 'GAME_START' })
        }
        // 复活信息
        this.recoverNum = 2
        this.health = 1
        // 球掉落
        this.node.on(BallFallDGEvent.Name, function (event) {
            that.gameOver()
            AudioPlayer.play(6)
        })
        //获得bonus
        this.node.on(BonusGainDGEvent.Name, function (event) {
            that.gameUI.setBonus(that.gameData.bonusGain(event.value))
        })
        //传送
        this.node.on(PortalContactDGEvent.Name, function (event) {
            AudioPlayer.play(4)
        })
        //蹦床
        this.node.on(TrampolineContactDGEvent.Name, function (event) {
            that.gameData.trampolineContact()

            switch (event.trampolineType) {
                case "RectTrampoline":
                    break
                case "CircleTrampoline":
                    break
                case "ShootTrampoline":
                    AudioPlayer.play(3)
                    break
            }
        })
        this.node.on(BallStartShootDGEvent.Name, function (event) {
            AudioPlayer.play(7)
        })
    },
    login(nickName) {
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
    gameOver() {
        this.health--
        if (this.health >= 1)
            return
        this.resultBonus = this.gameData.getBonus()
        this.gameUI.setBonus(this.gameData.getBonus())
        this.recoverNum--
        if (this.recoverNum >= 0)
            this.gameUI.gameOverWithRecover(this.resultBonus, this.onCloseGameOverAndShare.bind(this), this.onCloseGameOverAndVideo.bind(this), this.onCloseGameOverAndNormal.bind(this))
        else
            this.gameUI.gameOverWithoutRecover(this.resultBonus, this.onCloseGameOverAndNormal.bind(this));
        // 把得分上传至后端并向UI传入从后端获得的世界排名信息
        if (cc.sys.platform === cc.sys.WECHAT_GAME && this.openid != null) {
            this.uploadRankAndGetRank(this.openid, this.resultBonus)
        }
        // 向微信开放数据域传递分数数据
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_OVER', mark: this.resultBonus })
        }
    },
    showRankAndPause() {
        this.gameManager.pause()
        this.gameUI.showRank(this.closeRankAndResume.bind(this))
    },
    closeRankAndResume() {
        this.gameManager.resume()
    },
    onCloseGameOverAndShare() {
        this.health = 1
    },
    onCloseGameOverAndVideo() {
        this.health = 2
    },
    onCloseGameOverAndNormal() {
        this.gameData.resetData()
        this.gameUI.setBonus(this.gameData.getBonus())
        this.recoverNum = 2
        this.health = 1
    },
    uploadRankAndGetRank(openid, resultBonus) {
        var that = this
        wx.cloud.callFunction({
            name: 'uploadMark',
            data: {
                openid: openid,
                mark: resultBonus,
                topUserNum: 20, // 世界排名显示的前几名
                radiusFront: 2, // 玩家目前排名附近的其他玩家半径
                radiusBack: 3
            },
            success: that.onRecieveRank.bind(that)
        })
    },
    onRecieveRank(res) {
        let curRank = 1
        let myRank = res.result.rank
        const unknownNicknames = ['匿名用户']
        res.result.topUsers.forEach(element => {
            if (curRank == myRank)
                element.nickname = "您"
            else {
                if (element.nickName != null)
                    element.nickname = element.nickName
                else
                    element.nickname = unknownNicknames[Math.floor(Math.random() * (unknownNicknames.length - 1))]
            }
            curRank++
        })
        curRank = res.result.nearFrontRank
        res.result.nearUsers.forEach(element => {
            console.log(element)
            if (curRank == myRank)
                element.nickname = "您"
            else {
                if (element.nickName != null)
                    element.nickname = element.nickName
                else
                    element.nickname = unknownNicknames[Math.floor(Math.random() * (unknownNicknames.length - 1))]
            }
            curRank++
        })
        this.gameUI.setWorldRank(res.result)
    }
})