


var eventName = "UpgradableBonusUpgradeGL"

var UpgradableBonusUpgradeGLEvent = cc.Class({
    extends: cc.Event.EventCustom,
    statics: {
        Name: eventName
    },
    properties: {
    },
    init: function(bonusName, level, mxLevel) {
        this.type = eventName
        this.bubbles = true
        this.bonusName = bonusName
        this.level = level
        this.mxLevel = mxLevel
    }
})

module.exports = UpgradableBonusUpgradeGLEvent