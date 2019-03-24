

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.x = this.target.x;
        this.node.y = this.target.y;
    },

     update (dt) {
        this.node.x = this.target.x;
        this.node.y = this.target.y;
     },
});
