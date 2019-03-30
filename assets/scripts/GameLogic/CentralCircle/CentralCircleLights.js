
var CentralCircleLights = cc.Class({
    extends: cc.Component,

    properties: {
        Lights :{
            default: [],
            type: cc.Animation,
        }
    },
    onLoad(){
        this.setValue(0, 0);
    },

    setValue(value, mxValue) {
        //this.node.rotation = value/mxValue * 360
        for(var i = 0; i <= value && i < this.Lights.length; i++){
            this.Lights[i].play("LightOn");
        }
        for(var i = value + 1; i < this.Lights.length; i++){
            this.Lights[i].play("LightOff");
        }
    }
});


module.exports = CentralCircleLights