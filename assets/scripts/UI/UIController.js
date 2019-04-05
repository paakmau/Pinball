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
        this.mark = 0
        this.setBonus(this.mark)
    },
    //设置bonus的值。value为int类型
    setBonus(value){
        this.Bonus.string = '得分:  ' + value
        this.mark = value
    },
    gameOver(mark) {
        this.alertDialog.showGameOver("游戏结束", null, false, mark)
    },
    setWorldRank(worldRankData) {
        this.alertDialog.setWorldRank(worldRankData)
    },
    showRank() {
        this.alertDialog.showGamePause("游戏暂停", null, false, this.mark)
    }
})

module.exports = UIController