// (agent) [8z3ukmteu2y] Called android.app.Dialog.show()
// (agent) [8z3ukmteu2y] Backtrace:
//         android.app.Dialog.show(Native Method)
//         com.fanwe.lib.dialog.impl.SDDialogBase.show(SDDialogBase.java:337)                                                    
//         com.fanwe.live.activity.room.LiveLayoutViewerExtendActivity.showScenePayJoinDialog(LiveLayoutViewerExtendActivity.java:618)
//         com.fanwe.live.activity.room.LiveLayoutViewerExtendActivity.onScenePayViewerShowWhetherJoin(LiveLayoutViewerExtendActivity.java:516)
//         com.fanwe.pay.LiveScenePayViewerBusiness.dealPayModelRoomInfoSuccess(LiveScenePayViewerBusiness.java:156)
//         com.fanwe.live.activity.room.LiveLayoutViewerExtendActivity.onBsRequestRoomInfoSuccess(LiveLayoutViewerExtendActivity.java:111)
//         com.fanwe.live.activity.room.LivePushViewerActivity.onBsRequestRoomInfoSuccess(LivePushViewerActivity.java:405)
//         com.fanwe.live.business.LiveBusiness.onRequestRoomInfoSuccess(LiveBusiness.java:306)
//         com.fanwe.live.business.LiveViewerBusiness.onRequestRoomInfoSuccess(LiveViewerBusiness.java:79)
//         com.fanwe.live.business.LiveBusiness$2.onSuccess(LiveBusiness.java:257)
//         com.fanwe.library.adapter.http.callback.SDRequestCallback.onSuccessInternal(SDRequestCallback.java:127)
//         com.fanwe.library.adapter.http.callback.SDRequestCallback.notifySuccess(SDRequestCallback.java:175)
//         com.fanwe.hybrid.http.AppHttpUtil$1.onSuccess(AppHttpUtil.java:105)
//         com.fanwe.hybrid.http.AppHttpUtil$1.onSuccess(AppHttpUtil.java:74)
//         org.xutils.http.HttpTask.onSuccess(HttpTask.java:447)
//         org.xutils.common.task.TaskProxy$InternalHandler.handleMessage(TaskProxy.java:198)
//         android.os.Handler.dispatchMessage(Handler.java:106)
//         android.os.Looper.loop(Looper.java:164)
//         android.app.ActivityThread.main(ActivityThread.java:6494)
//         java.lang.reflect.Method.invoke(Native Method)
//         com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
//         com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)

// (agent) [8z3ukmteu2y] Return Value: (none)
//com.fanwe.pay.appview.PayLiveBlackBgView
setImmediate(function(){
    Java.perform(function(){
        console.log("Entering hook")

        Java.use("com.fanwe.lib.dialog.impl.SDDialogBase").show.implementation = function(){
            console.log("hook show ")
        }
            
        Java.use("com.fanwe.pay.appview.PayLiveBlackBgView").startCountDown.implementation = function(x){
            console.log("Calling startCountDown ")
            return this.startCountDown(1000*3600)
        }

        

    })
})