import Alert from "./Alert/Alert"

var UIController = cc.Class({
    extends: cc.Component,
    properties:{
        Bonus: {
            default: null,
            type: cc.Label
        },
        alertDialog: Alert
    },
    onLoad(){
        // cc.log("UIController onLoad()")
        this.Bonus.string = "0"
    },
    // bonusGain(value){
    //     this.result = parseInt(this.Bonus.string) + value
    //     this.Bonus.string = Number(this.result)
    // },
    //设置bonus的值。value为int类型
    setBonus(value){
        this.Bonus.string = Number(value)
    },
    //返回bonus的值，int类型
    getBonus(){
        return parseInt(this.Bonus.string)
    },
    /**
     * 
     * @param {int} mark 最终的分数
     */
    gameOver(mark){
        this.alertDialog.show("游戏结束", null, false, mark)
    },
    setWorldRank(worldRankData) {
        this.alertDialog.setWorldRank(worldRankData)
    }
})

module.exports = UIController