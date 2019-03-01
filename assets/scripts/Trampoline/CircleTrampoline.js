
var CircleTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        bombPower: 100
    },
    
    onBeginContact(contact, selfCollider, otherCollider) {
        var bombDir = otherCollider.node.position.sub(selfCollider.node.position).normalize().mul(bombPower);
        this.node.on("ball_bomb", bombDir);
    }
});

module.exports = CircleTrampoline;