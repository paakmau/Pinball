
import Request from "../Utils/Request"

export default {
    RegisterOrLoginByWxId(wxId, callback) {
        Request.Get("RegisterOrLoginByWxId", { wxId: wxId }, callback)
    },
    UpdateScoreByWxId(data, callback) {
        Request.Post("UpdateScoreByWxId", data, callback)
    }
}