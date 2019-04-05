
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
    onLoad(){
        var that = this
        this.gameData.resetData()
        AudioPlayer.init(this.gameAudio)

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
        }

        // 球掉落
        this.node.on(BallFallDGEvent.Name, function(event){
            // cc.log("Main Controller game over")
            //Alert.show("WASTED!! BONUS:" + that.gameData.getBonus(), null, false, 0.3,that.CameraNode.x, that.CameraNode.y)
            that.gameOver()
            //that.gameAudio.playEffectAudio(6)
            AudioPlayer.play(6)
         })

        //获得bonus
        this.node.on(BonusGainDGEvent.Name, function(event){
            // cc.log("Main Controller :" + event.type)
            that.gameUI.setBonus(that.gameData.bonusGain(event.value))
            //that.gameAudio.playEffectAudio(5)
            //AudioPlayer.play(5)
        })

        //传送
        this.node.on(PortalContactDGEvent.Name, function(event){
            //that.gameAudio.playEffectAudio(4)
            AudioPlayer.play(4)
        })

        //蹦床
        this.node.on(TrampolineContactDGEvent.Name, function(event){
            // cc.log("11111trampoline Contact DG")
            that.gameData.trampolineContact()
            
            switch(event.trampolineType){
                case "RectTrampoline":
                    //that.gameAudio.playEffectAudio(1)
                    //AudioPlayer.play(1)
                    break
                case "CircleTrampoline":
                    //that.gameAudio.playEffectAudio(2)
                    //AudioPlayer.play(2)
                    break
                case "ShootTrampoline":
                    //that.gameAudio.playEffectAudio(3)
                    AudioPlayer.play(3)
                    break
            }

        })

        this.node.on(BallStartShootDGEvent.Name, function(event) {
            AudioPlayer.play(7)
        })

    },

    gameOver(){
        var that = this

        this.resultBonus = this.gameData.getBonus()
        this.gameData.resetData()
        this.gameUI.setBonus(this.gameData.getBonus())
        this.gameUI.gameOver(this.resultBonus)


        /*  数据格式样例
            this.gameUI.setWorldRank({
                maxMark: 10000,
                topUsers: [
                    {
                        nickname: 'hbm',
                        mark: 2333333
                    }
                ],
                nearUsers: [
                    {
                        nickname: 'me',
                        mark: 23333
                    }
                ],
                nearFrontRank: 95
            })
        */

        // 把得分上传至后端并向UI传入从后端获得的世界排名信息
        // TODO: 有缘的话可以封装
        if(cc.sys.platform === cc.sys.WECHAT_GAME && this.openid!=null) {
            this.uploadRankAndGetRank(this.openid, this.resultBonus)
        }

        // 向微信开放数据域传递分数数据
        if(cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ type: 'GAME_OVER' , mark: this.resultBonus })
        }
    },
    showRank() {
        this.gameManager.pause()
        this.gameUI.showRank()
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
        this.gameUI.setWorldRank(res.result)
    }
})