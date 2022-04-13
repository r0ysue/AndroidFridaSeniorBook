// # (agent) [2xhzmmkxx1r] Called com.fanwe.live.common.CommonInterface.requestIndex(int, int, int, java.lang.String, com.fanwe.hybrid.http.AppRequestCallback)
// (agent) [2xhzmmkxx1r] Backtrace:                                                  
//         com.fanwe.live.common.CommonInterface.requestIndex(Native Method)
//         com.fanwe.live.appview.main.LiveTabHotView.requestData(LiveTabHotView.java:390)
//         com.fanwe.live.appview.main.LiveTabHotView.onLoopRun(LiveTabHotView.java:382)
//         com.fanwe.live.appview.main.LiveTabBaseView$1.run(LiveTabBaseView.java:116)
//         com.fanwe.lib.looper.impl.SDSimpleLooper$1.handleMessage(SDSimpleLooper.java:54)
//         android.os.Handler.dispatchMessage(Handler.java:106)
//         android.os.Looper.loop(Looper.java:164)
//         android.app.ActivityThread.main(ActivityThread.java:6494)
//         java.lang.reflect.Method.invoke(Native Method)
//         com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
//         com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)

// (agent) [2xhzmmkxx1r] Arguments com.fanwe.live.common.CommonInterface.requestIndex(1, (none), (none), 热门, com.fanwe.live.appview.main.LiveTabHotView$4@89cbef4)
// (agent) [2xhzmmkxx1r] Return Value: (none)

function hook() {
    Java.perform(function () {
        var JSON = Java.use("com.alibaba.fastjson.JSON")
        var Index_indexActModel = Java.use("com.fanwe.live.model.Index_indexActModel");
        var gson = Java.use("com.google.gson.Gson").$new();
        var LiveRoomModel = Java.use("com.fanwe.live.model.LiveRoomModel");
        Java.use("com.fanwe.live.appview.main.LiveTabHotView$4").onSuccess.implementation = function (resp) {
            console.log("Entering Room List Parser => ", resp)
            var result = resp.getDecryptedResult();
            var resultModel = JSON.parseObject(result, Index_indexActModel.class);
            var roomList = Java.cast(resultModel, Index_indexActModel).getList();
            console.log("size : ", roomList.size(), roomList.get(0))
            for (var i = 0; i < roomList.size(); i++) {
                var LiveRoomModelInfo = Java.cast(roomList.get(i), LiveRoomModel);
                console.log("roominfo: ", i, " ", gson.toJson(LiveRoomModelInfo));
            }

            return this.onSuccess(resp)
        }
    })
}

function invoke(){

    Java.perform(function(){
        Java.choose("com.fanwe.live.appview.main.LiveTabHotView",{
            onMatch:function(ins){
                console.log("found ins => ",ins)
                ins.requestData();
            },onComplete:function(){
                console.log("Search completed!")
            }
        })
    })

}

function main() {
    hook()
    // invoke()
}

setImmediate(main)