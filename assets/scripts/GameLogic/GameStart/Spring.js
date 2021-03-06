/**
 * 游戏开始弹簧
 * 手指触下开始计时, 弹簧压缩
 * 手指松开弹起, 根据时间决定小球发射冲量
 */
var BombStartBombGLEvent = require("../../Message/GameLogic/BallStartBombGLEvent")

cc.Class({
    extends: cc.Component,
    properties: {
        bombPowerFact: 2000,
        springUpSpeed: 0.1,
        maxAccTime: 0.7,
        maxDownDis: 100,
        ZhenFu: 1
    },
    onLoad(){
        // 成员变量
        this.isPressed = false
        this.originPos = this.node.position
        this.over = false
        this.accTime = 0
        this.overTime = 0
        this.node.on('touchstart', this.springDown, this)
        this.node.on('touchcancel', this.springUp, this)
        this.node.on('touchend', this.springUp, this)
    },
    update(dT) {
        if(this.isPressed) {
            if(this.accTime < this.maxAccTime && !this.over){
                this.accTime += dT
                this.accTime = Math.min(this.maxAccTime, this.accTime)
                // this.node.position = this.originPos.add(cc.v2(0, -this.accTime/this.maxAccTime*this.maxDownDis))
                // this.maxPosition = this.node.position
            }else{
                // this.node.position = this.node.position.add(cc.v2(0, (Math.random() - 0.5) * 5))
                // this.overTime += dT
                // this.node.position = this.maxPosition.add(cc.v2(0, this.ZhenFu * Math.sin(this.overTime * 10)))
                this.over = true
                this.overTime += dT
                this.accTime = this.maxAccTime + this.ZhenFu * Math.sin(this.overTime * 5)
            }
            this.node.position = this.originPos.add(cc.v2(0, -this.accTime/this.maxAccTime*this.maxDownDis))
            this.maxPosition = this.node.position

        }
    },
    springDown(){
        this.isPressed = true
        // cc.log("spring down")
    },
    springUp(){
        this.isPressed = false
        var moveToAction = cc.moveTo(this.accTime*this.springUpSpeed, this.originPos)
        moveToAction.easing(cc.easeIn(5.0))
        var action = cc.sequence(moveToAction, cc.callFunc(this.onSpringUpEnd, this))
        this.node.runAction(action)
        // cc.log("spring up")
    },
    onSpringUpEnd() {
        var event = new BombStartBombGLEvent()
        event.init(cc.v2(0, 1).mul(this.accTime * this.bombPowerFact))
        // cc.log(cc.v2(0, 1).mul(this.accTime * this.bombPowerFact).y)
        this.node.dispatchEvent(event)
        this.accTime = 0
        this.overTime = 0
        this.over = false
    }
})