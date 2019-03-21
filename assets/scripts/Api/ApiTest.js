
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
    
    onClickLogin() {
        UserApi.RegisterOrLoginByWxId(this.loginEditBox.string, res=>{ console.log(res) })
    }
});
