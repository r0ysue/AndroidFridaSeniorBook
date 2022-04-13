function hook(){
    Java.perform(function(){
       var settings  = Java.use("com.android.settings.DisplaySettings");
       var getMetricsCategory_func = settings.getMetricsCategory.overload()
       getMetricsCategory_func.implementation = function(){
           var result = this.getMetricsCategory()
           console.log("getMetricsCategory called",',result =>',result)
           return result
       }
    })
}
function hookSubString(){
    Java.perform(function(){
        var String = Java.use('java.lang.String')
        var subString_int_func = String.substring.overload('int')
        subString_int_func.implementation = function(index){
            var result = this.substring(index)
           console.log("substring called",'index =>',index,',result =>',result)
           return result
        }
    })
}

function main(){
    hook();
}
setImmediate(main)