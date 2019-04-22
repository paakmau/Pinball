
cc.Class({
    extends: cc.Component,

    properties: {
        progressBarSpeed: 100,
        progressBar: cc.Node,
        loadingLoading: cc.Node,
        loadingGameStart: cc.Node,
        gameStartBtn: cc.Button
    },

    onLoad () {
        cc.loader.downloader.loadSubpackage('res-package', err => {
            if(err)
                console.log(err)
            else {
                gameStartBtn.interactable = true
                loadingGameStart.active = true
                loadingLoading.active = false
            }
        })
        this.progressOri = this.progressBar.x
        this.progress = 0
    },

    update(dT) {
        this.progress = this.progress + dT*this.progressBarSpeed
        while(this.progress>=30) {
            this.progress-=30
        }
        this.progressBar.x = this.progressOri + this.progress
    },

    gameStart() {
        cc.director.loadScene('GameDemo')
    }
});
