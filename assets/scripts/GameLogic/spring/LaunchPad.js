var BallBombTrampolineGLEvent = require("../../Message/GameLogic/BallBombTrampolineGLEvent")
cc.Class({
    extends: cc.Component,
    properties: {
        bombPower: 2000
    },
    onLoad(){
        this.enable = true;
        var that = this;
        this.firstPosition = this.node.position;
        this.endPosition = this.node.position;

        // this.node.on(cc.Node.EventType.MOUSE_DOWN, this.springStart, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.springDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.springUp, this);
        this.rigidBody = this.getComponent(cc.RigidBody);
        // this.rigidBody.enabledContactListener = false;
        
    },
    springDown(event){
        if(event.keyCode == cc.macro.KEY.space && this.enable){
            this.enable = false;
            cc.log("spring down");
            var action = cc.moveBy(1,cc.v2(0, -100));
            this.node.runAction(action);
        }
    },
    springUp(event){
        cc.log("spring up");
        this.node.stopAllActions();
        var action = cc.moveTo(0.3, cc.v2(252.7,-488.4));
        this.node.runAction(action);
        this.enable = true;
        this.endPosition = this.node.position;
        cc.log("end = " + this.endPosition.y + " and first = " + this.firstPosition);
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        // 触发Bomb事件
        var bombDir = this.firstPosition.sub(this.endPosition).normalize().mul(this.bombPower).mul(this.firstPosition.y - this.endPosition.y);
        var bombEvent = new BallBombTrampolineGLEvent();
        bombEvent.init(bombDir, BallBombTrampolineGLEvent.TrampolineType.CircleTrampoline);
        this.node.dispatchEvent(bombEvent);
        cc.log(bombDir.x + "and" + bombDir.y);
        this.endPosition = this.firstPosition;
    }

});