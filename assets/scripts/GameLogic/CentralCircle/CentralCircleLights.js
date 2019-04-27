
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
        this.LightState = new Array(this.Lights.length)
        //初始化，将每盏灯的state设置为0
        for(var i = 0; i < this.LightState.length; i++){
            this.LightState[i] = 0
        }
    },

    setValue(value, mxValue) {
        //this.node.rotation = value/mxValue * 360
        for(var i = 0; i <= value && i < this.Lights.length; i++){
            if(this.LightState != undefined){
                if(this.LightState[i] != 1){
                    this.Lights[i].play("LightOn");
                    this.LightState[i] = 1
                }
            }else{
                this.Lights[i].play("LightOn");
            }
        }
        for(var i = value + 1; i < this.Lights.length; i++){
            if(this.LightState != undefined){
                if(this.LightState[i] != 0){
                    this.Lights[i].play("LightOff");
                    this.LightState[i] = 0;
                }
            }else{
                this.Lights[i].play("LightOff");
            }
        }
    }
});


module.exports = CentralCircleLights