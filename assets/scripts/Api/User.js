
import Request from "../Utils/Request"

export default {
    RegisterOrLoginByWxId(wxId, callback) {
        Request.Get("RegisterOrLoginByWxId", { wxId: wxId }, callback)
    },
    UpdateScoreById(data, callback) {
        Request.Post("UpdateScoreById", data, callback)
    }
}