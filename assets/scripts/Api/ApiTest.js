
import UserApi from "../Api/User"


cc.Class({
    extends: cc.Component,

    properties: {
        loginEditBox: {
            type: cc.EditBox,
            default: null
        },
        updateUserEditBox: cc.EditBox
    },

    onRegisterOrLoginByWxId() {
        UserApi.RegisterOrLoginByWxId(this.loginEditBox.string, res=>{ console.log(res) })
    },
    
    onUpdateScoreById() {
        UserApi.UpdateScoreById({ id: 2, score: 1005 }, res => { console.log(res) })
    }
});
