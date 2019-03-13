cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad(){
        this.enable = true;
        var that = this;

        // this.node.on(cc.Node.EventType.MOUSE_DOWN, this.springStart, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.springDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.springUp, this);
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.rigidBody.enabledContactListener = false;
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
        var action = cc.moveTo(0.1, cc.v2(252.7,-500.7));
        this.node.runAction(action);
        this.rigidBody.enabledContactListener = true;
        this.enable = true;
    }

});