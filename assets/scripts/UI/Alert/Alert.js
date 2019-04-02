import RankController from './RankController'


/**
 * 管理游戏结束对话框的出现和隐藏
 * 
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/

cc.Class({
    extends: cc.Component,
    properties:{
        detailLabel: cc.Label,
        cancelButton: cc.Node,
        enterButton: cc.Node,
        outBackground: cc.Node,
        animSpeed: 0.1,
        rankController: RankController
    },
    onLoad() {
        var self = this
        Alert._alert = this

        // 配置动画
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self)
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self)
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(self.animSpeed, 255), cc.scaleTo(self.animSpeed, 1.0)), cbFadeIn)
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(self.animSpeed, 0), cc.scaleTo(self.animSpeed, 2.0)), cbFadeOut)

    },
    show(detailString, enterCallBack, needCancel, mark) {

        // 设置mark
        this.rankController.init(mark)

        this.configAlert(detailString, enterCallBack, needCancel)

        this.startFadeIn()
    },
    onExitButtonClicked : function(event){
        if(event.target.name == "enterButton"){
            if(this.enterCallBack){
                this.enterCallBack()
            }
        }
        this.startFadeOut()
    },
    // 执行弹进动画
    startFadeIn : function () {
        cc.eventManager.pauseTarget(this, true)
        this.node.position = cc.p(0, 0)
        this.node.setScale(2)
        this.node.opacity = 0
        this.node.runAction(this.actionFadeIn)
    },
    // 执行弹出动画
    startFadeOut : function () {
        cc.eventManager.pauseTarget(this, true)
        this.node.runAction(this.actionFadeOut)
    },
    // 弹进动画完成回调
    onFadeInFinish : function () {
        cc.eventManager.resumeTarget(this, true)
    },
    // 弹出动画完成回调
    onFadeOutFinish : function () {
        this.node.position = cc.p(10000, 10000)
    },
    configAlert : function (detailString, enterCallBack, needCancel) {

        // 回调
        this.enterCallBack = enterCallBack

        // 内容
        this.detailLabel.string = detailString

        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) { // 显示
            this.cancelButton.active = true
        } else {  // 隐藏
            this.cancelButton.active = false
            this.enterButton.x = 0
        }
    }
})


const Alert = {
    _alert: null,           // 单例
}
Alert.show = function (detailString, enterCallBack, needCancel, mark) {

    this._alert.show(detailString, enterCallBack, needCancel, mark)

    return this._alert.detailLabel;
}


export default Alert