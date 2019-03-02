
var CircleTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        bombPower: 3000
    },
    
    onBeginContact(contact, selfCollider, otherCollider) {
        var bombDir = otherCollider.node.position.sub(selfCollider.node.position).normalize().mul(this.bombPower);
        // TODO: 应当使用消息系统
        cc.director.emit("ball_bomb", bombDir);
    }
});

module.exports = CircleTrampoline;