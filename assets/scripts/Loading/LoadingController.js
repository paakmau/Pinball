
cc.Class({
    extends: cc.Component,

    properties: {
        progressBarSpeed: 100,
        progressBar: cc.Node
    },

    onLoad () {
        cc.loader.downloader.loadSubpackage('res-package', err => {
            if(err)
                console.log(err)
            else
                cc.director.loadScene('GameDemo')
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
    }
});
