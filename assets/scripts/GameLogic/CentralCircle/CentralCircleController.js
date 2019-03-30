
var CentralCircleLights = require('./CentralCircleLights')


cc.Class({
    extends: cc.Component,

    properties: {
        innerLights: CentralCircleLights,
        outerLights: CentralCircleLights,
        redLight: cc.Node
    },

    setInnerLight(num, size) {
        this.innerLights.setValue(num, size)
    },

    setOuterLight(num, size) {
        this.outerLights.setValue(num, size)
    },
    blinkRedLight(){
        this.redLight.getComponent(cc.Animation).play()
    }

    // update (dt) {},
});
