
var Ball = require("./Ball")
var Racket = require("./Racket")
var CentralCircleController = require('./CentralCircle/CentralCircleController')
var ButtonBonusGroup = require("./Bonus/ButtonBonusGroup")
var UpgradableBonusController = require("./Bonus/UpgradableBonusController")

var BallReadyGLEvent = require("../Message/GameLogic/BallReadyGLEvent")
var BallStartBombGLEvent = require("../Message/GameLogic/BallStartBombGLEvent")
var BallBombTrampolineGLEvent = require("../Message/GameLogic/BallBombTrampolineGLEvent")
var BallTransferGLEvent = require("../Message/GameLogic/BallTransferGLEvent")
var BonusGainGLEvent = require("../Message/GameLogic/BonusGainGLEvent")
var UpgradableBonusUpgradeGLEvent = require("../Message/GameLogic/UpgradableBonusUpgradeGLEvent")
var RacketPunchGLEvent = require("../Message/GameLogic/RacketPunchGLEvent")
var GameOverGLEvent = require("../Message/GameLogic/GameOverGLEvent")
var BlackHoleInGLEvent = require("../Message/GameLogic/BlackHoleInGLEvent")
var BlackHoleOutGLEvent = require("../Message/GameLogic/BlackHoleOutGLEvent")


var BonusGainDGEvent = require("../Message/DataGen/BonusGainDGEvent")
var TrampolineContactDGEvent = require("../Message/DataGen/TrampolineContactDGEvent")
var PortalContactDGEvent = require("../Message/DataGen/PortalContactGLEvent")
var RacketPunchDGEvent = require("../Message/DataGen/RacketPunchDGEvent")
var BallFallDGEvent = require("../Message/DataGen/BallFallDGEvent")
var BallStartShootEvent = require("../Message/DataGen/BallStartShootDGEvent")

cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            type: Ball,
            default: null
        },
        racket: {
            type: Racket,
            default: []
        },
        ballStarterNode: cc.Node,
        centralCircleController: CentralCircleController,
        buttonBonusGroups:{
            type: ButtonBonusGroup,
            default:[]
        },
        upgradableBonusController: {
            type: UpgradableBonusController,
            default: null
        }
    },
    onLoad() {
        var that = this

        // 初始化成员变量
        this. ballStarterWorldCenter = this.ballStarterNode.position

        // 开启物理引擎
        cc.director.getPhysicsManager().enabled = true
        cc.director.getCollisionManager().enabled = true


        // 观察者模式, 监听子节点的事件

        // 小球就绪事件
        this.node.on(BallReadyGLEvent.Name, function(event) {
            that.isBallReady = event.isReady
        })

        // 小球开始Bomb事件
        this.node.on(BallStartBombGLEvent.Name, function(event) {
            if(that.isBallReady) {
                that.ball.bomb(event.bombDir)
                var dGEvent = new BallStartShootEvent()
                dGEvent.init()
                that.node.dispatchEvent(dGEvent)
            }
        })

        // 小球蹦床Bomb事件
        this.node.on(BallBombTrampolineGLEvent.Name, function(event) {
            that.ball.bomb(event.bombDir)
            // cc.log("BallBomb, type:" + event.trampolineType)
            var dGEvent = new TrampolineContactDGEvent()
            dGEvent.init(event.trampolineType)
            that.node.dispatchEvent(dGEvent)
        })

        // 小球传送事件
        this.node.on(BallTransferGLEvent.Name, function(event) {
            that.ball.transfer(event.pos)
            // cc.log("BallTransfer")
            var dGEvent = new PortalContactDGEvent()
            dGEvent.init()
            that.node.dispatchEvent(dGEvent)
            that.centralCircleController.addInnerLight()
        })

        // 获得Bonus事件
        this.node.on(BonusGainGLEvent.Name, function(event) {
            // cc.log("BonusGain "+event.factor)
            var dGEvent = new BonusGainDGEvent()
            dGEvent.init(event.factor)
            that.node.dispatchEvent(dGEvent)
        })

        // 可升级Bonus升级事件
        this.node.on(UpgradableBonusUpgradeGLEvent.Name, function(event) {
            // cc.log("UpgradableBonus Upgraded, name:" + event.bonusName + ", level: " + event.level)
            that.centralCircleController.setOuterLight(event.level, event.mxLevel)
        })

        // GameOver事件
        this.node.on(GameOverGLEvent.Name, function(event) {
            that.ball.transfer(that.ballStarterWorldCenter)
            that.ball.restart()
            // cc.log("Game Over")
            var dGEvent = new BallFallDGEvent()
            dGEvent.init()
            that.node.dispatchEvent(dGEvent)
            that.centralCircleController.blinkRedLight()
            for(var i = 0; i < that.buttonBonusGroups.length;i++){
                that.buttonBonusGroups[i].reset();
            }
            that.upgradableBonusController.reset();
            that.centralCircleController.reset();
        })

        // RacketPunch事件
        this.node.on(RacketPunchGLEvent.Name, function(event) {
            // cc.log("Racket has punched!")
            var dGEvent = new RacketPunchDGEvent()
            dGEvent.init()
            that.node.dispatchEvent(dGEvent)
        })

        // 进入黑洞事件
        this.node.on(BlackHoleInGLEvent.Name, function(event) {
            that.ball.goIntoBlackHole(event.pos)
            // cc.log("Go Into Black Hole")
        })

        // 脱离黑洞事件
        this.node.on(BlackHoleOutGLEvent.Name, function(event) {
            that.ball.goOutOfBlackHole(event.pos, event.bombDir)
            // cc.log("Go Out Of Black Hole")
        })
    }
})
