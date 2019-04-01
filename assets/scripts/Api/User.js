
import Request from "../Utils/Request"

export default {
    RegisterOrLoginByWxId(wxId, wxName, callback) {
        Request.Post("RegisterOrLoginByWxId", { wxId: wxId, wxName: wxName }, callback)
    },
    UpdateScoreById(id, score, topUserNum, radiusFront, radiusBack, callback) {
        Request.Post("UpdateScoreById", { id: id, score: score, topUserNum: topUserNum, radiusFront:radiusFront, radiusBack: radiusBack }, callback)
    }
}