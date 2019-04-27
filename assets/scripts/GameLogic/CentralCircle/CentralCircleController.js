
var CentralCircleLights = require('./CentralCircleLights')


cc.Class({
    extends: cc.Component,

    properties: {
        innerLights: CentralCircleLights,
        outerLights: CentralCircleLights,
        redLight: cc.Node
    },
    onLoad(){
        this.innerNum = 0;
    },

    setInnerLight(num, size) {
        this.innerLights.setValue(num, size)
    },

    setOuterLight(num, size) {
        this.outerLights.setValue(num, size)
    },
    blinkRedLight(){
        this.redLight.getComponent(cc.Animation).play()
    },
    /**
     * 增加一盏灯
     */
    addInnerLight(){
        if(this.innerNum == this.innerLights.Lights.length){
            this.innerNum = 0;
        }else{
            this.innerNum++;
            this.setInnerLight(this.innerNum, 6);
        }
    },
    reset(){
        this.innerLights.setValue(0,0);
        this.outerLights.setValue(0,0);
        this.innerNum = 0;
    }

    // update (dt) {},
});
