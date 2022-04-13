function inspectObject(obj) {
    Java.perform(function () {
        const Class = Java.use("java.lang.Class");
        const obj_class = Java.cast(obj.getClass(), Class);
        const fields = obj_class.getDeclaredFields();
        const methods = obj_class.getMethods();
        console.log("Inspecting " + obj.getClass().toString());
        console.log("\tFields:");
        for (var i in fields){
           // console.log("\t\t" + fields[i].toString());
           var className = obj_class.toString().trim().split(" ")[1] ;
           // console.log("className is => ",className);
           var fieldName = fields[i].toString().split(className.concat(".")).pop() ; 
           console.log(fieldName + " => ",obj[fieldName].value);
        }
        // console.log("\tMethods:");
        // for (var i in methods)
        //     console.log("\t\t" + methods[i].toString());
    })
}


function hookROOMinfo() {
    Java.perform(function () {
        var JSON = Java.use("com.alibaba.fastjson.JSON")
        var App_get_videoActModel = Java.use("com.fanwe.live.model.App_get_videoActModel");

        Java.use("com.fanwe.live.business.LiveBusiness$2").onSuccess.implementation = function (resp) {
            console.log("Enter LiveBusiness$2 ... ", resp)
            var result = resp.getDecryptedResult();
            var resultVideoModel = JSON.parseObject(result, App_get_videoActModel.class);
            var roomDetail = Java.cast(resultVideoModel, App_get_videoActModel);
            console.log("room id is => ", roomDetail.getRoom_id());
            inspectObject(roomDetail);
            return this.onSuccess(resp);
        }
    })

}


function invoke(){

    Java.perform(function(){
        Java.choose("com.fanwe.live.business.LiveBusiness",{
            onMatch:function(ins){
                console.log("found ins => ",ins)
                // ins.requestData();
            },onComplete:function(){
                console.log("Search completed!")
            }
        })
    })
}


function invoke2(){
    Java.perform(function(){

        // com.fanwe.live.business.LiveBusiness(ILiveActivity);
        var ILiveActivity = Java.use("com.fanwe.live.activity.room.ILiveActivity");

        const ILiveActivityImpl = Java.registerClass({
            name: 'com.fanwe.live.activity.room.ILiveActivityImpl',
            implements: [ILiveActivity],
            methods: {
                openSendMsg(){},
                getCreaterId(){},
                getGroupId(){},
                getRoomId(){},
                getRoomInfo(){},
                getSdkType(){},
                isAuctioning(){},
                isCreater(){},
                isPlayback(){},
                isPrivate(){}
            }
          });

        var result = Java.use("com.fanwe.live.business.LiveBusiness").$new(ILiveActivityImpl.$new());
        console.log("result is => ",result.requestRoomInfo("123454"))
    })
}


var LiveBusiness = null ;
console.log("LiveBusiness is => ", LiveBusiness)
function hook3(){
    Java.perform(function(){
        Java.use("com.fanwe.live.business.LiveBusiness").getLiveQualityData.implementation = function(){
            LiveBusiness = this;
            console.log("now LiveBusiness is => ", LiveBusiness)
            LiveBusiness.requestRoomInfo("12343");
            var result = this.getLiveQualityData()
            return result;
        }
    })
}

function invoke3(){
    Java.perform(function(){
        var result = LiveBusiness.requestRoomInfo("12343");
        console.log("result is => ",result)
    })
}


function invoke4(){
    Java.perform(function(){

        // com.fanwe.live.business.LiveBusiness(ILiveActivity);
        var ILiveActivity = Java.use("com.fanwe.live.activity.room.ILiveActivity");
        const ILiveActivityImpl = Java.registerClass({
            name: 'com.fanwe.live.activity.room.ILiveActivityImpl',
            implements: [ILiveActivity],
            methods: {
                openSendMsg(){},
                getCreaterId(){},
                getGroupId(){},
                getRoomId(){},
                getRoomInfo(){},
                getSdkType(){},
                isAuctioning(){},
                isCreater(){},
                isPlayback(){},
                isPrivate(){}
            }
          });

        var LB = Java.use("com.fanwe.live.business.LiveBusiness").$new(ILiveActivityImpl.$new());

        var LB2 = Java.use("com.fanwe.live.business.LiveBusiness$2");
        var AppRequestCallback = Java.use('com.fanwe.hybrid.http.AppRequestCallback');
        Java.use("com.fanwe.live.common.CommonInterface").requestRoomInfo(1377894,123,"1234",Java.cast(LB2.$new(LB),AppRequestCallback));
    })
}


function main() {
    hookROOMinfo();
    hook3();
}

setImmediate(main)


// # (agent) [c5k4k2jwdu9] Called com.fanwe.live.common.CommonInterface.requestRoomInfo(int, int, java.lang.String, com.fanwe.hybrid.http.AppRequestCallback)
// (agent) [c5k4k2jwdu9] Backtrace:                                                  
//         com.fanwe.live.common.CommonInterface.requestRoomInfo(Native Method)
//         com.fanwe.live.business.LiveBusiness.requestRoomInfo(LiveBusiness.java:243)
//         com.fanwe.live.activity.room.LiveLayoutViewerActivity.requestRoomInfo(LiveLayoutViewerActivity.java:374)
//         com.fanwe.live.activity.room.LivePushViewerActivity.init(LivePushViewerActivity.java:74)
//         com.fanwe.library.activity.SDBaseActivity.afterOnCreater(SDBaseActivity.java:125)
//         com.fanwe.library.activity.SDBaseActivity.onCreate(SDBaseActivity.java:112)
//         android.app.Activity.performCreate(Activity.java:6999)
//         android.app.Activity.performCreate(Activity.java:6990)
//         android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1214)
//         android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2731)
//         android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2856)
//         android.app.ActivityThread.-wrap11(Unknown Source:0)
//         android.app.ActivityThread$H.handleMessage(ActivityThread.java:1589)
//         android.os.Handler.dispatchMessage(Handler.java:106)
//         android.os.Looper.loop(Looper.java:164)
//         android.app.ActivityThread.main(ActivityThread.java:6494)
//         java.lang.reflect.Method.invoke(Native Method)
//         com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
//         com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)

// (agent) [c5k4k2jwdu9] Arguments com.fanwe.live.common.CommonInterface.requestRoomInfo(1377908, (none), (none), com.fanwe.live.business.LiveBusiness$2@732309d)      
// (agent) [c5k4k2jwdu9] Return Value: [object Object]


// # plugin wallbreaker classdump --fullname com.fanwe.live.bu
// siness.LiveBusiness$2                                                                                  

// package com.fanwe.live.business

// class LiveBusiness$2 {

//         /* static fields */                                                                            

//         /* instance fields */
//         com.fanwe.live.business.LiveBusiness this$0;

//         /* constructor methods */
//         com.fanwe.live.business.LiveBusiness$2(com.fanwe.live.business.LiveBusiness);

//         /* static methods */

//         /* instance methods */
//         java.lang.String getCancelTag();
//         void onError(com.fanwe.library.adapter.http.model.SDResponse);
//         void onSuccess(com.fanwe.library.adapter.http.model.SDResponse);

// }         