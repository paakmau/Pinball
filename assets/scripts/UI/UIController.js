var UIController = cc.Class({
    extends: cc.Component,
    properties:{
        Bonus:{
            default: null,
            type: cc.Label
        }
    },
    onLoad(){
        cc.log("UIController onLoad()");
        this.Bonus.string = "0";
        //this.that = this;
    },
    bonusGain(value){
        this.result = parseInt(this.Bonus.string) + value;
        this.Bonus.string = Number(this.result);
    }
});

module.exports = UIController;