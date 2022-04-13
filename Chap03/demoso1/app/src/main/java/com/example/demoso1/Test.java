package com.example.demoso1;

import android.util.Log;

public class Test {
    public String flag = null ;
    public Test(){
        flag= "Test()";
    }
    public Test(String arg){
        flag = "Test(String arg)";
    }
    public Test(String arg,int arg2){
        flag = "Test(String arg,int arg2)";
    }

    public static String publicStaticField = "i am a publicStaticField";
    public String publicField = "i am a publicField";
    private static String privateStaticField = "i am a privateStaticField";
    private String privateField = "i am a privateField";

    public static void publicStaticFunc(){
        Log.i("r0reflection", "I`m from publicStaticFunc");
    }
    public void publicFunc(){
        Log.i("r0reflection", "I`m from publicFunc");
    }
    private static void privateStaticFunc(){
        Log.i("r0reflection", "I`m from privateFunc");
    }
    private void privateFunc(){
        Log.i("r0reflection", "I`m from privateFunc");
    }
}
