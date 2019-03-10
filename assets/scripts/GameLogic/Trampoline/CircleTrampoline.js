/**
 * 球形蹦床
 * 若小球碰到它, 会被施加一个沿碰撞法向量n的冲量 bombPower*n
 */

var BallBombEvent = require("../../Message/GameLogic/BallBombEvent")

var CircleTrampoline = cc.Class({
    extends: cc.Component,
    properties: {
        bombPower: 3000
    },
    
    onBeginContact(contact, selfCollider, otherCollider) {
        // 触发Bomb事件
        var bombDir = otherCollider.node.position.sub(selfCollider.node.position).normalize().mul(this.bombPower);
        var bombEvent = new BallBombEvent();
        bombEvent.init(bombDir);
        this.node.dispatchEvent(bombEvent);
    }
});

module.exports = CircleTrampoline;