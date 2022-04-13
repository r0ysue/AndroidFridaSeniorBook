function hook(){
    Java.perform(function(){
        var MainActivity = Java.use("com.example.demoso1.MainActivity");
        MainActivity.method01.implementation = function(str){
            
            // > 写主动调用之前先hook，hook时就是一个主动调用
            // > 写hook时的主动调用，1000%是成功的！
            // > 如果其他时候的主动调用失败了？？那就去康康hook时的主动调用咋写
            // 主动调用参数构造的最终目的：是要构造跟hook时一样的参数
            var result = this.method01(str);
            console.log("str=> ",str);
            console.log("result=> ",result);
            return result;
        }
    })
}
function invokeMethod01(){
    var result; // 不要定义在`Java.perform`包裹中，否则在退出`Java.perform`后就被释放了
    Java.perform(function(){
        
        var MainActivity = Java.use("com.example.demoso1.MainActivity");
        var javaString = Java.use("java.lang.String")
        var plaintext = "r0ysue"
        result = MainActivity.method01(javaString.$new(plaintext))
        console.log("plaintext => ",plaintext);
        console.log("result => ",result); // 4e8de2f3c674d8157b4862e50954d81c
        
    }) 
   // return result;
    
}
// function invokeMethod02(){
//     var result; // 不要定义在`Java.perform`包裹中，否则在退出`Java.perform`后就被释放了
//     Java.perform(function(){
        
//         var MainActivity = Java.use("com.example.demoso1.MainActivity");
//         var javaString = Java.use("java.lang.String")
//         var plaintext = "4e8de2f3c674d8157b4862e50954d81c"
//         result = MainActivity.method02(javaString.$new(plaintext))
//         console.log("plaintext => ",plaintext);
//         console.log("result => ",result); // 4e8de2f3c674d8157b4862e50954d81c
        
//     }) 
//    // return result;
// }
function invokeMethod01(plaintext){
    var result
    Java.perform(function(){
        var MainActivity = Java.use("com.example.demoso1.MainActivity");
        var javaString = Java.use("java.lang.String")
        result = MainActivity.method01(javaString.$new(plaintext))
        
    })
    return result;
    
}
var MainActivityObj = null;
Java.perform(function(){
    Java.choose("com.example.demoso1.MainActivity",{
        onMatch:function(instance){
            MainActivityObj = instance;
        },onComplete(){}
    })
    console.log("MainActivityObj is => ",MainActivityObj)
}) 
function invokeMethod02(ciphertext){
    var result;
    Java.perform(function(){
        var javaString = Java.use("java.lang.String")
        result = MainActivityObj.method02(javaString.$new(ciphertext))   
    })
    return result;
}

rpc.exports={
    method01:invokeMethod01,
    method02:invokeMethod02
}
