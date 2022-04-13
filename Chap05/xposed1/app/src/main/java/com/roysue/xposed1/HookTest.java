package com.roysue.xposed1;

import android.app.AndroidAppHelper;
import android.content.Context;
import android.util.Log;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.security.auth.login.LoginException;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import fi.iki.elonen.NanoHTTPD;

public class HookTest implements IXposedHookLoadPackage {
    public void PrintStack(){

        XposedBridge.log("Dump Stack: "+ "---------------start----------------");
        Throwable ex = new Throwable();
        StackTraceElement[] stackElements = ex.getStackTrace();
        if (stackElements != null) {
            for (int i = 0; i < stackElements.length; i++) {

                XposedBridge.log("Dump Stack"+i+": "+ stackElements[i].getClassName()
                        +"----"+stackElements[i].getFileName()
                        +"----" + stackElements[i].getLineNumber()
                        +"----" +stackElements[i].getMethodName());
            }
        }
        XposedBridge.log("Dump Stack: "+ "---------------over----------------");


        RuntimeException e = new RuntimeException("<Start dump Stack !>");
        e.fillInStackTrace();
        Log.i("<Dump Stack>:", "++++++++++++", e);

    }

//    Object mMainActivity = null;
//
//    public void setActivity(Object obj) {
//        mMainActivity = obj;
//    }
//
//    public Object getActivity() {
//        return mMainActivity;
//    }


    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam loadPackageParam) throws Throwable {
        //XposedBridge.log(loadPackageParam.processName);
        if (loadPackageParam.packageName.equals("com.roysue.xposed1")) {
            XposedBridge.log(" has Hooked!");
            XposedBridge.log("inner"+loadPackageParam.processName);
            Class clazz = loadPackageParam.classLoader.loadClass("com.roysue.xposed1.MainActivity");
            XposedHelpers.findAndHookMethod(clazz, "toastMessage", String.class,new XC_MethodHook() {

                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {

                    String oldText = (String) param.args[0];
                    Log.d("din not hijacked=>", oldText);

                    //param.args[0] = "test";

                    param.args[0] = "你已被劫持";
                    PrintStack();

                    //super.beforeHookedMethod(param);

                    //XposedBridge.log(" has Hooked!");


                }

                protected void afterHookedMethod(MethodHookParam param) throws Throwable {

                    Log.d("getResult is => ",(String) param.getResult());

                    param.setResult("你已被劫持2");

                }

            });

        }


//        if (loadPackageParam.packageName.equals("org.teamsik.ahe17.qualification.easy")) {
//
//            XposedBridge.log("inner"+loadPackageParam.processName);
//            Class clazz = loadPackageParam.classLoader.loadClass("org.teamsik.ahe17.qualification.Verifier");
//
//            Method encodePassword = clazz.getDeclaredMethod("encodePassword", String.class);
//            encodePassword.setAccessible(true);
//
//            byte[] p = "09042ec2c2c08c4cbece042681caf1d13984f24a".getBytes();
//            String pStr = new String((p));
//
//
//            for(int i = 999;i<10000;i++){
//
//                byte[] v = (byte[]) encodePassword.invoke(null,String.valueOf(i));
//                if (v.length != p.length) {
//                    break;
//                }
//                String vStr = new String(v);
//                if(vStr.equals(pStr)){
//                    XposedBridge.log("1) Current i is => "+ i);
//                }
//            }
//        }

//       XposedHelpers.callMethod(mMainAciticity,"showSuccessDialog");
//        if (loadPackageParam.packageName.equals("org.teamsik.ahe17.qualification.easy")) {
//
//            XposedBridge.log("inner"+loadPackageParam.processName);
//            Class clazz = XposedHelpers.findClass("org.teamsik.ahe17.qualification.Verifier",loadPackageParam.classLoader);
//
//            Context context = AndroidAppHelper.currentApplication();
//
//            for(int i = 999;i<10000;i++){
//                if((boolean) XposedHelpers.callStaticMethod(clazz,"verifyPassword",context,String.valueOf(i))){
//                    XposedBridge.log("3). Current i is => "+ String.valueOf(i));
//                }
//            }
//        }
        // fail
//        if (loadPackageParam.packageName.equals("org.teamsik.ahe17.qualification.easy")) {
//
//            XposedBridge.log("inner " + loadPackageParam.processName);
//            Class clazz = XposedHelpers.findClass("org.teamsik.ahe17.qualification.Verifier", loadPackageParam.classLoader);
//
//            XposedHelpers.findAndHookMethod(clazz, "encodePassword", String.class, new XC_MethodHook() {
//                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                    Context context = AndroidAppHelper.currentApplication();
//                    if(param.thisObject != null){
//                        for (int i = 999; i < 10000; i++) {
//                            // hook get instance
//
//                            if ((boolean) XposedHelpers.callMethod(param.thisObject, "verifyPassword", context, String.valueOf(i))) {
//                                XposedBridge.log("4). Current i is => " + String.valueOf(i));
//                            }
//                        }
//                    }
//
//                    Log.d("-----getResult is => ", (String) param.getResult());
//                }
//            });
//        }
//        if (loadPackageParam.packageName.equals("org.teamsik.ahe17.qualification.easy")) {
//            XposedBridge.log("inner" + loadPackageParam.processName);
//
//            Constructor cons = XposedHelpers.findConstructorExact("org.teamsik.ahe17.qualification.Verifier",loadPackageParam.classLoader);
//            Object Verifier = cons.newInstance();
//
//            Context context = AndroidAppHelper.currentApplication();
//
//            for (int i = 999; i < 10000; i++) {
//                if ((boolean) XposedHelpers.callMethod(Verifier, "verifyPassword", context, String.valueOf(i))) {
//                    XposedBridge.log("5). Current i is => " + String.valueOf(i));
//                }
//            }
//        }

//        if (loadPackageParam.packageName.equals("org.teamsik.ahe17.qualification.easy")) {
//
//            XposedBridge.log("inner" + loadPackageParam.processName);
//            Class clazz = XposedHelpers.findClass("org.teamsik.ahe17.qualification.Verifier", loadPackageParam.classLoader);
//
//            Object Verifier = XposedHelpers.newInstance(clazz);
//
//            Context context = AndroidAppHelper.currentApplication();
//
//            for (int i = 999; i < 10000; i++) {
//                if ((boolean) XposedHelpers.callMethod(Verifier, "verifyPassword", context, String.valueOf(i))) {
//                    XposedBridge.log("6). Current i is => " + String.valueOf(i));
//                }
//            }
//        }

//        if (loadPackageParam.packageName.equals("org.teamsik.ahe17.qualification.easy")) {
//
//            XposedBridge.log("inner" + loadPackageParam.processName);
//
//            Class clazz = loadPackageParam.classLoader.loadClass("org.teamsik.ahe17.qualification.MainActivity");
//
//            XposedBridge.hookAllMethods(clazz, "onCreate",new XC_MethodHook() {
//                @Override
//                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                    super.afterHookedMethod(param);
//                    Object mMainAciticity = param.thisObject;
//                    if (mMainAciticity != null){
//                        XposedHelpers.callMethod(mMainAciticity,"showSuccessDialog");
//                    }
//
//
//                }
//            });
//        }

        if (loadPackageParam.packageName.equals("com.example.demoso1")) {

            XposedBridge.log("inner" + loadPackageParam.processName);


            final Class clazz = loadPackageParam.classLoader.loadClass("com.example.demoso1.MainActivity");

            //得到对象：hook(想通过hook的方式得到一个obj的话得hook一个实例方法)
            XposedBridge.hookAllMethods(clazz, "onCreate", new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    Object mMainAciticity = param.thisObject;
                    String cipherText = (String) XposedHelpers.callMethod(mMainAciticity, "method01", "roysue");
                    String clearText = (String) XposedHelpers.callMethod(mMainAciticity, "method02", "47fcda3822cd10a8e2f667fa49da783f");
                    XposedBridge.log("1). Cipher text is => " + cipherText);
                    XposedBridge.log("1). Clear text is => " + clearText);
                    setActivity(mMainAciticity);

                }
            });

            //xposed.newInstance获取对象 active call get consturctor has params by objection
            Object newMainActivity = XposedHelpers.newInstance(clazz);
            String cipherText = (String) XposedHelpers.callMethod(newMainActivity, "method01", "roysue");
            String clearText = (String) XposedHelpers.callMethod(newMainActivity, "method02", "47fcda3822cd10a8e2f667fa49da783f");
            XposedBridge.log("2) Cipher text is => " + cipherText);
            XposedBridge.log("2) Clear text is => " + clearText);
            setActivity(newMainActivity);


            class App extends NanoHTTPD {

                public App() throws IOException {
                    super(8899);
                    start(NanoHTTPD.SOCKET_READ_TIMEOUT, true);
                    XposedBridge.log("\nRunning! Point your browsers to http://localhost:8899/ \n");
                }

                @Override
                public NanoHTTPD.Response serve(IHTTPSession session) {

                    Method method = session.getMethod();
                    String uri = session.getUri();
                    String RemoteIP = session.getRemoteIpAddress();
                    String RemoteHostName = session.getRemoteHostName();
                    Log.i("r0ysue nanohttpd ","Method => "+method + " ;Url => " + uri + "' ");
                    Log.i("r0ysue nanohttpd ","Remote IP  => "+RemoteIP + " ;RemoteHostName => " + RemoteHostName + "' ");
//                    if(session.getMethod().toString() == "POST"){
                    String paramBody = "";
                    Map<String, String> params = new HashMap<>();
                    try {
                        session.parseBody(params);
                        paramBody = session.getQueryParameterString();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (ResponseException e) {
                        e.printStackTrace();
                    }
//                        Log.i("r0ysue nanohttpd => ", paramBody);

//                    }


                    String msg = "Hello server";
//                    Map<String, String> parms = session.getParms();
//                    if (parms.get("username") == null) {
//                        msg += "<form action='?' method='get'>\n  <p>Your name: <input type='text' name='username'></p>\n" + "</form>\n";
//                    } else {
//                        msg += "<p>Hello, " + parms.get("username") + "!</p>";
//                    }
                    String result = "";
                    if(uri.contains("encrypt")){
                        result = (String) XposedHelpers.callMethod(getActivity(), "method01", paramBody);
                    }else if (uri.contains("decrypt")){
                        result = (String) XposedHelpers.callMethod(getActivity(), "method02", paramBody);
                    }else{
                        result = paramBody;
                    }

                    return newFixedLengthResponse(Response.Status.OK, NanoHTTPD.MIME_PLAINTEXT, result + '\n');
                }
            }
            new App();

        }

    }

}