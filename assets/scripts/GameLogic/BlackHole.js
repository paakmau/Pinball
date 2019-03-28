import AudioPlayer from "../Utils/AudioPlayerUtil"
var BlackHoleInGLEvent = require("../Message/GameLogic/BlackHoleInGLEvent")
var BlackHoleOutGLEvent = require("../Message/GameLogic/BlackHoleOutGLEvent")


var BlackHole = cc.Class({
    extends: cc.Component,

    properties: {
        bombPower: 10000,
        ballInTimeMax: 0.8
    },

    onLoad() {
        this.bombDir = cc.v2(0, 1).rotate(-this.node.rotation/180*3.14159).mul(this.bombPower)
        this.ballIn = false
        this.ballInTime = 0.0
    },
    onCollisionEnter() {
        this.ballIn = true
        this.ballInTime = 0.0
        var inEvent = new BlackHoleInGLEvent()
        inEvent.init(this.node.position)
        this.node.dispatchEvent(inEvent)
    },
    update(dT) {
        if(this.ballIn) {
            this.ballInTime += dT
            if(this.ballInTime >= this.ballInTimeMax) {
                this.ballIn = false
                var outEvent = new BlackHoleOutGLEvent()
                outEvent.init(this.node.position, this.bombDir.add(cc.v2(Math.random(), Math.random())))
                this.node.dispatchEvent(outEvent)
                AudioPlayer.play(8);
            }
        }
    }
})

module.exports = BlackHole