function hookMD5(targetClassMethod) {
    Java.perform(function () {
       // var targetClassMethod = "java.security.MessageDigest.getInstance"
        var delim = targetClassMethod.lastIndexOf(".");
        if (delim === -1) return;
        var targetClass = targetClassMethod.slice(0, delim)
        var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

        var hook = Java.use(targetClass);
        var overloadCount = hook[targetMethod].overloads.length;
        var overloadCount = hook[targetMethod].overloads.length;
        for (var i = 0; i < overloadCount; i++) {
            hook[targetMethod].overloads[i].implementation = function () {
                console.warn("\n*** entered " + targetClassMethod);
                // print args
                if (arguments.length >= 0) {
                    for (var j = 0; j < arguments.length; j++) {
                        console.log("arg[" + j + "]: " + arguments[j],'=>',JSON.stringify(arguments[j]));
                    }
                }
                var retval = this[targetMethod].apply(this, arguments);
                console.log("\nretval: " + retval,'=>',JSON.stringify(retval));
                console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
                return retval;
            }
        }

    })
}

function main() {
    var targetClassMethod = "java.security.MessageDigest.getInstance"
    hookMD5(targetClassMethod)

    targetClassMethod = "java.security.MessageDigest.update"
    hookMD5(targetClassMethod)
     targetClassMethod = "java.security.MessageDigest.digest"
     hookMD5(targetClassMethod)

}
setImmediate(main)