
cc.Class({
    extends: cc.Component,

    properties: {
        progressBarSpeed: 1,
        progressBar: cc.ProgressBar
    },

    onLoad () {
        cc.loader.downloader.loadSubpackage('res-package', err => {
            if(err)
                console.log(err)
            else
                cc.director.loadScene('GameDemo')
        })
    },

    update(dT) {
        let progress = this.progressBar.progress + dT*this.progressBarSpeed
        while(progress>=1)
            progress-=1
        this.progressBar.progress = progress
    }
});
