function hook_native_method(addr){
    Interceptor.attach(addr,{
        onEnter:function(args){
            console.log("args[0]=>",args[0]) // JNIEnv*
            console.log("args[1]=>",args[1]) // jclass
            console.log("args[2]=>",
                Java.vm.getEnv().getStringUtfChars(args[2], null)
                                .readCString()) // 调用jni函数，参考`frida-java-bridge`
        },onLeave:function(retval){
            console.log('result => ',
                Java.vm.getEnv().getStringUtfChars(retval, null)
                                .readCString())
        }
    })
}
function replacehook(addr){
    // 根据地址得到
    var addr_func = new NativeFunction(addr,'pointer',['pointer','pointer','pointer']);
    Interceptor.replace(addr,new NativeCallback(function(arg1,arg2,arg3){
        // 确定主动调用可以成功，只要参数合法，地址正确
        var result = addr_func(arg1,arg2,arg3) // <== 主动调用
        console.log('arg3 =>', Java.vm.getEnv().getStringUtfChars(arg3, null).readCString() )

        console.log("result is ",Java.vm.getEnv().getStringUtfChars(result, null).readCString())
        return result;
    },'pointer',['pointer','pointer','pointer']))
}
function hookmethod01(){
    var base = Module.findBaseAddress('libnative-lib.so')
    var method01_addr  = base.add(0x10018)
    replacehook(method01_addr)
}
function invoke_func(addr,contents){
    var result = null;
    var func = new NativeFunction(addr,'pointer',['pointer','pointer','pointer']); // new一个native函数
    Java.perform(function(){    
        var env = Java.vm.getEnv();
        console.log("content is ",contents)
        var jstring =  env.newStringUtf(contents)
        result = func(env,ptr(1),jstring)
        // console.log("result is =>",result)
        result = env.getStringUtfChars(result, null)
    })
    return result;
}
function invoke_method01(){
    var base = Module.findBaseAddress('libnative-lib.so')
    var method01_addr  = base.add(0x10018)
    var result  = invoke_func(method01_addr,"r0ysue")
    console.log("result is ",result.readCString())  
}
function invoke_method01_1(){
    var base = Module.load('/data/app/libnative-lib.so').base
    var method01_addr  = base.add(0x10018)
    var result  = invoke_func(method01_addr,"r0ysue")
    console.log("result is ",result.readCString())  
}
