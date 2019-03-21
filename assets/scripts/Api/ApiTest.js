
import UserApi from "../Api/User"


cc.Class({
    extends: cc.Component,

    properties: {
    },

    onRegisterOrLoginByWxId() {
        UserApi.RegisterOrLoginByWxId('zyqnb!!!', res=>{ console.log(res) })
    },
    
    onUpdateScoreById() {
        UserApi.UpdateScoreById({ id: 2, score: 1005 }, res => { console.log(res) })
    }
});
