
var CentralCircleLights = require('./CentralCircleLights')


cc.Class({
    extends: cc.Component,

    properties: {
        innerLights: CentralCircleLights,
        outerLights: CentralCircleLights
    },

    setInnerLight(num, size) {
        this.innerLights.setValue(num, size)
    },

    setOuterLight(num, size) {
        this.outerLights.setValue(num, size)
    }

    // update (dt) {},
});
