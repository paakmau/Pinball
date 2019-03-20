/**
 * 游戏开始弹簧
 * 手指触下开始计时, 弹簧压缩
 * 手指松开弹起, 根据时间决定小球发射冲量
 */

var BombStartBombGLEvent = require("../Message/GameLogic/BallStartBombGLEvent");

cc.Class({
    extends: cc.Component,
    properties: {
        bombPowerFact: 2000,
        springUpSpeed: 0.1,
        maxAccTime: 0.7,
        maxDownDis: 100
    },
    onLoad(){
        // 成员变量
        this.isPressed = false;
        this.originPos = this.node.position;
        this.accTime = 0;

        // TODO: 测试用
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.springDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.springUp, this);
    },
    update(dT) {
        if(this.isPressed) {
            this.accTime += dT;
            this.accTime = Math.min(this.maxAccTime, this.accTime);
            this.node.position = this.originPos.add(cc.v2(0, -this.accTime/this.maxAccTime*this.maxDownDis));
        }
    },
    springDown(event){
        if(event.keyCode==cc.macro.KEY.space && this.isPressed==false) {
            this.isPressed = true;
            cc.log("spring down");
        }
    },
    springUp(event){
        if(event.keyCode==cc.macro.KEY.space && this.isPressed==true) {
            this.isPressed = false;
            var moveToAction = cc.moveTo(this.accTime*this.springUpSpeed, this.originPos);
            moveToAction.easing(cc.easeIn(5.0));
            var action = cc.sequence(moveToAction, cc.callFunc(this.onSpringUpEnd, this));
            this.node.runAction(action);
            cc.log("spring up");
        }
    },
    onSpringUpEnd() {
        var event = new BombStartBombGLEvent();
        event.init(cc.v2(0, 1).mul(this.accTime * this.bombPowerFact).add(cc.v2(Math.random(), Math.random())));
        this.node.dispatchEvent(event);
        this.accTime = 0;
    }
});