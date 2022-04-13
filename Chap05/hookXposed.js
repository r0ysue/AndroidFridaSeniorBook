function uniqBy(array, key)
{
        var seen = {};
        return array.filter(function(item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
}

// trace a specific Java Method
function traceMethod(targetClassMethod)
{
	var delim = targetClassMethod.lastIndexOf(".");
	if (delim === -1) return;

	var targetClass = targetClassMethod.slice(0, delim)
	var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

	var hook = Java.use(targetClass);
	var overloadCount = hook[targetMethod].overloads.length;

    console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");
    
    

	for (var i = 0; i < overloadCount; i++) {

		hook[targetMethod].overloads[i].implementation = function() {
			console.warn("\n*** entered " + targetClassMethod);

			// print backtrace
			// Java.perform(function() {
			//	var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
			//	console.log("\nBacktrace:\n" + bt);
			// });

			// print args
			if (arguments.length) console.log();
			for (var j = 0; j < arguments.length; j++) {
                console.log("arg[" + j + "]: " + arguments[j]);
                
			}

			// print retval
			var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
            console.log("\nretval: " + retval);
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
			console.warn("\n*** exiting " + targetClassMethod);
			return retval;
		}
    }
    
}

function traceClass(targetClass)
{
  //Java.use是新建一个对象哈，大家还记得么？
	var hook = Java.use(targetClass);
  //利用反射的方式，拿到当前类的所有方法
    var methods = hook.class.getDeclaredMethods();
    // var methods = hook.class.getMethods();
  //建完对象之后记得将对象释放掉哈
	hook.$dispose;
  //将方法名保存到数组中
	var parsedMethods = [];
	methods.forEach(function(method) {
		parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1]);
	});
  //去掉一些重复的值
	var targets = uniqBy(parsedMethods, JSON.stringify);
  //对数组中所有的方法进行hook，traceMethod也就是第一小节的内容
	targets.forEach(function(targetMethod) {
		traceMethod(targetClass + "." + targetMethod);
	});
}




function hook() {
    Java.perform(function () {
        console.log("start")
        Java.enumerateClassLoaders({
            onMatch: function (loader) {
                try {
                   if(loader.findClass("com.ceco.nougat.gravitybox.ModStatusbarColor$1")){
                    // if(loader.findClass("de.robv.android.xposed.XC_MethodHook")){
                //  if(loader.findClass("de.robv.android.xposed.XposedBridge")){
                    //if(loader.findClass("com.android.internal.statusbar.StatusBarIcon")){
                   // if(loader.findClass("com.roysue.xposed1.HookTest")){
                        console.log("Successfully found loader")
                        console.log(loader);
                        Java.classFactory.loader = loader ;
                    }
                }
                catch(error){
                    // console.log("find error:" + error)
                }
            },
            onComplete: function () {
                console.log("end1")
            }
        })
        // Java.use("de.robv.android.xposed.XposedBridge").log.overload('java.lang.String').implementation = function (str) {
        //     console.log("entering Xposedbridge.log ",str.toString())
        //     return true
        // }
        //traceClass("com.ceco.nougat.gravitybox.ModStatusbarColor")
        // Java.use("com.roysue.xposed1.HookTest$1").afterHookedMethod.implementation = function (param){
        //     console.log("entering afterHookedMethod param is => ",param);
        //     return this.afterHookedMethod(param);
        // }
        // traceClass("de.robv.android.xposed.XC_MethodHook")
        // Java.use("de.robv.android.xposed.XC_MethodHook$MethodHookParam").setResult.implementation = function(str){
        //     console.log("entersing de.robv.android.xposed.XC_MethodHook$MethodHookParam setResult => ",str)
        //     console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        //     return this.setResult(str);
        // }

        Java.enumerateLoadedClasses ({
            onMatch:function(className){
                if(className.toString().indexOf("gravitybox")>0 && 
                className.toString().indexOf("$")>0
                ){
                    console.log("found => ",className)
                    // var interFaces = Java.use(className).class.getInterfaces();
                    // if(interFaces.length>0){
                    //     console.log("interface is => ");
                    //     for(var i in interFaces){
                    //         console.log("\t",interFaces[i].toString())
                    //     }
                    // }
                    if(Java.use(className).class.getSuperclass()){
                        var superClass = Java.use(className).class.getSuperclass().getName();
                        // console.log("superClass is => ",superClass);
                        if (superClass.indexOf("XC_MethodHook")>0){
                            console.log("found class is => ",className.toString())
                            traceClass(className);
                        }
                        
    

                    }
                    
                }
            },onComplete:function(){
                console.log("search completed!")
                
            }
        })
        
        console.log("end2")
    })
}
function main(){
    hook()
}
setImmediate(main)