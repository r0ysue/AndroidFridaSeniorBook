function hookVIP(){
    Java.perform(function(){
        Java.use("com.chanson.business.model.BasicUserInfoBean").isVip.implementation = function(){
            console.log("Calling isVIP ")
            return true;
        }
    })
    
}
function main(){
    console.log("Start hook")
    hookVIP()
}
setImmediate(main)