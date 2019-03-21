
let baseUrl = "http://localhost:8080/"

export default {
    Get: function(relUrl, reqData, callback){
        //拼接请求参数
        var param = "";
        for(var item in reqData)
            param += item + "=" + reqData[item] + "&";

        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 400){
                    var response = xhr.responseText;
                    // console.log(response)
                    if(response){
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    }else{
                        console.log("返回数据不存在")
                        callback(false);
                    }
                }else{
                    console.log("请求失败")
                    callback(false);
                }
            }
        }
        let url = baseUrl + relUrl + '?' + param
        xhr.open("GET", url, true);
        xhr.send();
    },
    Post: function (relUrl, reqData, callback) {
        //拼接请求参数
        let param = JSON.stringify(reqData)

        //发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 400){
                    var response = xhr.responseText;
                    // console.log(response)
                    if(response){
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    }else{
                        console.log("返回数据不存在")
                        callback(false);
                    }
                }else{
                    console.log("请求失败")
                    callback(false);
                }
            }
        };
        xhr.open("POST", baseUrl + relUrl, true);
        xhr.setRequestHeader("Content-Type" , "application/json");  
        xhr.send(param);//reqData为json拼接的字符串
    }
}