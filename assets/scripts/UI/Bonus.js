var Bonus = cc.Class({
    extends: cc.Component,
    properties:{

    },
    onLoad(){
        cc.log("!!!!!!!!!!!!!!!!!!!!bonusUI")
        this.label = this.getComponent(cc.Label);  
        this.label.String = "cnm";
    },
    update(){
        cc.log(this.label.String);
        this.label.String = "GKD";
    }
})