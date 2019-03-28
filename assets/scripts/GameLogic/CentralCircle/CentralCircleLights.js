
var CentralCircleLights = cc.Class({
    extends: cc.Component,

    properties: {
    },

    setValue(value, mxValue) {
        this.node.rotation = value/mxValue * 360
    }
});


module.exports = CentralCircleLights