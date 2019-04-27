
var Ball = cc.Class({
    extends: cc.Component,

    properties: {
        maxGravity: 0,
        minDensity: 0,
    },

    onLoad() {
        // 获取成员变量
        this.rigidBody = this.getComponent(cc.RigidBody)
        this.physicsCircleCollider = this.getComponent(cc.PhysicsCircleCollider)
        this.worldCenter = this.rigidBody.getWorldCenter()
        this.time = 0
        this.originDensity = this.physicsCircleCollider.density
        this.originGravity = this.rigidBody.gravityScale
        
    },

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
        this.rigidBody.gravityScale = this.originGravity
        this.physicsCircleCollider.density = this.originDensity
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
    },
    pause() {
        this.oriSpeed = this.rigidBody.linearVelocity
        this.rigidBody.type = cc.RigidBodyType.Static
    },
    resume() {
        this.rigidBody.linearVelocity = this.oriSpeed
        this.rigidBody.type = cc.RigidBodyType.Dynamic
    },
    faster(){
        //更快:密度变为90%，重力变为1.2倍，之后给一个小冲量
        if(this.physicsCircleCollider.density > this.minDensity)
            this.physicsCircleCollider.density *= 0.9
        this.rigidBody.linearVelocity = this.rigidBody.linearVelocity.mul(1.3)
        if(this.rigidBody.gravityScale < this.maxGravity)
            this.rigidBody.gravityScale *= 1.2
        cc.log("g = " + this.rigidBody.gravityScale + "density = " + this.physicsCircleCollider.density)
    }
})

module.exports = Ball