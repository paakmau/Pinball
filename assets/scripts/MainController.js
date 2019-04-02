
import AudioPlayer from "./Utils/AudioPlayerUtil";
var BallFallDGEvent = require("./Message/DataGen/BallFallDGEvent")
var BonusGainDGEvent = require("./Message/DataGen/BonusGainDGEvent")
var PortalContactDGEvent = require("./Message/DataGen/PortalContactGLEvent")
var TrampolineContactDGEvent = require("./Message/DataGen/TrampolineContactDGEvent")
var DataContainer = require("./Data/DataContainer")
var UIController = require("./UI/UIController")
var AudioController = require("./Audio/AudioController")

cc.Class({
    extends: cc.Component,
    properties:{
        gameData: {
            default: null,
            type: DataContainer
        },
        gameUI:{
            default: null,
            type: UIController
        },
        gameAudio:{
             default: null,
             type: AudioController
         }
    },
    onLoad(){
        var that = this;
        this.gameData.resetData();
        AudioPlayer.init(this.gameAudio);

        if(cc.sys.platform === cc.sys.WECHAT_GAME) {
            // 初始化微信云开发
            wx.cloud.init({
                traceUser: true,
                env: 'pinball-backend-345f5b'
            })

            // 用户登陆
            this.openid = null
            wx.cloud.callFunction({
                name: 'login',
                success(res) {
                    that.openid = res.result.openid
                    console.log(that.openid)
                }
            })
        }

        // 球掉落
        this.node.on(BallFallDGEvent.Name, function(event){
            cc.log("Main Controller game over");
            //Alert.show("WASTED!! BONUS:" + that.gameData.getBonus(), null, false, 0.3,that.CameraNode.x, that.CameraNode.y);
            that.gameOver();
            //that.gameAudio.playEffectAudio(6);
            AudioPlayer.play(6);
         });

        //获得bonus
        this.node.on(BonusGainDGEvent.Name, function(event){
            cc.log("Main Controller :" + event.type);
            that.gameUI.setBonus(that.gameData.bonusGain(event.value));
            //that.gameAudio.playEffectAudio(5);
            //AudioPlayer.play(5);
        })

        //传送
        this.node.on(PortalContactDGEvent.Name, function(event){
            //that.gameAudio.playEffectAudio(4);
            AudioPlayer.play(4);
        })

        //蹦床
        this.node.on(TrampolineContactDGEvent.Name, function(event){
            cc.log("11111trampoline Contact DG");
            that.gameData.trampolineContact();
            
            switch(event.trampolineType){
                case "RectTrampoline":
                    //that.gameAudio.playEffectAudio(1);
                    //AudioPlayer.play(1);
                    break;
                case "CircleTrampoline":
                    //that.gameAudio.playEffectAudio(2);
                    //AudioPlayer.play(2);
                    break;
                case "ShootTrampoline":
                    //that.gameAudio.playEffectAudio(3);
                    AudioPlayer.play(3);
                    break;
            }

        })

    },

    updateBonus(){
        this.gameUI.setBonus(this.gameData.getBonus());
    },

    updateUI(){
        this.updateBonus();
    },
    gameOver(){
        var that = this

        this.resultBonus = this.gameData.getBonus()
        this.gameData.resetData();
        this.updateUI();
        this.gameUI.gameOver(this.resultBonus);


        //  数据格式样例
            // this.gameUI.setWorldRank({
            //     maxMark: 10000,
            //     topUsers: [
            //         {
            //             nickname: 'hbm',
            //             mark: 2333333
            //         },
            //         {
            //             nickname: 'sbsb',
            //             mark: 233334
            //         },
            //         {
            //             nickname: 'gjb',
            //             mark: 24444
            //         }
            //     ],
            //     nearUsers: [
            //         {
            //             nickname: 'test',
            //             mark: 23333
            //         },
            //         {
            //             nickname: 'me',
            //             mark: 10000
            //         },
            //         {
            //             nickname: 'sssssss',
            //             mark: 2004
            //         }
            //     ],
            //     nearFrontRank: 95
            // })


        // 把得分上传至后端并向UI传入从后端获得的世界排名信息
        if(cc.sys.platform === cc.sys.WECHAT_GAME && that.openid!=null) {
            wx.cloud.callFunction({
                name: 'uploadMark',
                data: {
                    openid: that.openid,
                    mark: that.resultBonus,
                    topUserNum: 3, // 世界排名显示的前几名
                    radiusFront: 1, // 玩家目前排名附近的其他玩家半径
                    radiusBack: 2
                },
                success(res) {
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
                    that.gameUI.setWorldRank(res.result)
                }
            })
        }
    }
})