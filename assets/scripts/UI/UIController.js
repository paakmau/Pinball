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
    },
    //设置bonus的值。value为int类型
    setBonus(value){
        this.Bonus.string = Number(value);
    },
    //返回bonus的值，int类型
    getBonus(){
        return parseInt(this.Bonus.string);
    }
});

module.exports = UIController;