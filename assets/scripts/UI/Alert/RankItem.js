

var FriendItem = cc.Class({
    extends: cc.Component,

    properties: {
        rankLabel: cc.Label,
        nicknameLabel: cc.Label,
        markLabel: cc.Label
    },

    init(rank, nickname, mark) {
        this.rankLabel.string = rank
        this.nicknameLabel.string = nickname
        this.markLabel.string = mark
    }
});


module.exports = FriendItem