
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        // 获取成员变量
        this.rigidBody = this.getComponent(cc.RigidBody)
        this.worldCenter = this.rigidBody.getWorldCenter()
        this.time = 0

        //TODO:测试用
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    // onKeyDown(event){
    //     switch(event.keyCode){
    //         case cc.KEY.a:
    //             this.rigidBody.applyLinearImpulse(cc.v2(-50,0), this.worldCenter);
    //             // this.node.x -= 20
    //             break;
    //         case cc.KEY.s:
    //             this.rigidBody.applyLinearImpulse(cc.v2(0,-50), this.worldCenter);
    //             // this.node.y -= 20;
    //             break;
    //         case cc.KEY.d:
    //             this.rigidBody.applyLinearImpulse(cc.v2(50,0), this.worldCenter);
    //             // this.node.x += 20;
    //             break;
    //         case cc.KEY.w:
    //             this.rigidBody.applyLinearImpulse(cc.v2(0,50), this.worldCenter);
    //             // this.node.y += 20;
    //             break;
    //     }
    // },

    // 对小球施加冲量
    bomb(dir) {
        this.rigidBody.applyLinearImpulse(dir, this.worldCenter)
    },

    // 小球传送
    transfer(pos) {
        this.node.position = pos
    },

    goIntoBlackHole(pos) {
        this.node.position = pos
        this.rigidBody.linearVelocity = cc.v2(0, 0)
        // 没救了
        this.originColor = this.node.color
        this.node.color = new cc.Color(50, 50, 50)
    },

    goOutOfBlackHole(pos, bombDir) {
        this.node.position = pos
        this.rigidBody.applyLinearImpulse(bombDir, this.worldCenter)
        // 没救了
        this.node.color = this.originColor
    },

    restart() {
        this.rigidBody.linearVelocity = cc.v2(0, 70.0)
    },

    isMoving() {
        return this.rigidBody.linearVelocity.magSqr() >= 0.01
    },
    update(dt){
        //连续1.5秒不动则给一个速度，防止卡死在某个地方
        if(!this.isMoving()){
            if(this.time < 1.5){
                this.time += dt
            }else{
                this.rigidBody.linearVelocity = cc.v2((Math.random()-0.5)*200, (Math.random()-0.5)*200)
                this.time = 0;
            }
        }else{
            this.time = 0;
        }
    }
})

module.exports = Ball