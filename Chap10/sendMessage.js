function uniqBy(array, key) {
    var seen = {};
    return array.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}
function hasOwnProperty(obj, name) {
    try {
        return obj.hasOwnProperty(name) || name in obj;
    } catch (e) {
        return obj.hasOwnProperty(name);
    }
}
function getHandle(object) {
    if (hasOwnProperty(object, '$handle')) {
        if (object.$handle != undefined) {
            return object.$handle;
        }
    }
    if (hasOwnProperty(object, '$h')) {
        if (object.$h != undefined) {
            return object.$h;
        }
    }
    return null;
}
//查看域值
function inspectObject(obj, input) {
    var isInstance = false;
    var obj_class = null;
    if (getHandle(obj) === null) {
        obj_class = obj.class;
    } else {
        var Class = Java.use("java.lang.Class");
        obj_class = Java.cast(obj.getClass(), Class);
        isInstance = true;
    }
    input = input.concat("Inspecting Fields: => ", isInstance, " => ", obj_class.toString());
    input = input.concat("\r\n")
    var fields = obj_class.getDeclaredFields();
    for (var i in fields) {
        if (isInstance || Boolean(fields[i].toString().indexOf("static ") >= 0)) {
            // output = output.concat("\t\t static static static " + fields[i].toString());
            var className = obj_class.toString().trim().split(" ")[1];
            // console.log("className is => ",className);
            var fieldName = fields[i].toString().split(className.concat(".")).pop();
            var fieldType = fields[i].toString().split(" ").slice(-2)[0];
            var fieldValue = undefined;
            if (!(obj[fieldName] === undefined))
                fieldValue = obj[fieldName].value;
            input = input.concat(fieldType + " \t" + fieldName + " => ", fieldValue + " => ", JSON.stringify(fieldValue));
            input = input.concat("\r\n")
        }
    }
    return input;
}
function TIMManager() {
    Java.perform(function () {
        Java.choose("com.tencent.imsdk.TIMManager", {
            onMatch: function (ins) {
                console.log("found ins => ", ins)
                console.log("found ins.getNetworkStatus() => ", ins.getNetworkStatus())
                console.log("found ins.getSdkConfig() => ", ins.getSdkConfig())
                // console.log("found ins.getUserConfig() => ", ins.getUserConfig())
                // var output = "";
                // output = inspectObject(ins.getUserConfig(), output);
                // console.log(output)
                console.log("found ins.getConversationList() => ", ins.getConversationList())
                console.log("found ins.getConversationList() => ", ins.getConversationList().toString())
                console.log("found ins.getConversationList() => ", JSON.stringify(ins.getConversationList()))

                var iter = ins.getConversationList().listIterator();
                while (iter.hasNext()) {
                    console.log(iter.next());
                    if (iter.next() != null) {
                        var TIMConversation = Java.cast(iter.next(), Java.use("com.tencent.imsdk.TIMConversation"))
                        console.log(TIMConversation.getPeer());
                        // if (TIMConversation.getPeer().toString().indexOf("209509") >= 0) {
                        console.log("try send message...")

                        //构造一条消息
                        var msg = Java.use("com.tencent.imsdk.TIMMessage").$new();
                        //添加文本内容
                        var elem = Java.use("com.tencent.imsdk.TIMTextElem").$new();
                        elem.setText("r0ysue222");
                        //将elem添加到消息
                        msg.addElement(elem)

                        // if (msg.addElement(elem) != 0) {
                        //     Log.d(tag, "addElement failed");
                        //     return;
                        // }
                        const callback = Java.registerClass({
                            name: 'com.tencent.imsdk.TIMValueCallBackCallback',
                            implements: [Java.use("com.tencent.imsdk.TIMValueCallBack")],
                            methods: {
                                onError(i, str) { console.log("send message failed. code: " + i + " errmsg: " + str) },
                                onSuccess(msg) { console.log("SendMsg ok", +msg) }
                            }
                        });
                        //发送消息
                        TIMConversation.sendMessage(msg, callback.$new())
                        // }
                    }
                }





                var peer = Java.use('java.lang.String').$new("klover1_server_190249");
                var conversation = ins.getConversation(Java.use("com.tencent.imsdk.TIMConversationType").C2C.value, peer);

                var msg = Java.use("com.tencent.imsdk.TIMMessage").$new();
                //添加文本内容
                var elem = Java.use("com.tencent.imsdk.TIMTextElem").$new();
                elem.setText(Java.use("java.lang.String").$new("r0ysue bad bad"));
                msg.addElement(elem)

                const callback = Java.registerClass({
                    name: 'callback',
                    implements: [Java.use("com.tencent.imsdk.TIMValueCallBack")],
                    methods: {
                        onError(code, desc) {
                            console.log("send message failed. code: " + code + " errmsg: " + desc);
                        },
                        onSuccess(msg) {//发送消息成功
                            console.log("SendMsg ok" + msg);
                        },
                    }
                });
                conversation.sendMessage(msg, callback.$new())

    }, onComplete: function () {
        console.log("search compeled")
    }
        })
    })
}

function main() {
    TIMManager()
}
setImmediate(main)