
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        // 开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }
});
