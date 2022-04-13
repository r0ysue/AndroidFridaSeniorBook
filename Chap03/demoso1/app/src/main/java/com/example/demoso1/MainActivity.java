package com.example.demoso1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MainActivity extends AppCompatActivity {

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Example of a call to a native method
        TextView tv = findViewById(R.id.sample_text);
        tv.setText(stringFromJNI());
        //Log.i("r0add", String.valueOf(this.myfirstjni()));
        //Log.i("r0add", MainActivity.stringFromJNI());

        //init();
        while(true){
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            Log.i("r0addmethod1", method01("roysue"));
            Log.i("r0addmethod2", method02(method01("roysue")));
        }

        //testField();
        //testMethod();

    }

    public void testField(){
        Class testClazz = null ;
        try {
            testClazz = MainActivity.class.getClassLoader().loadClass("com.example.demoso1.Test");
            Log.i("r0reflection", "Classloader.loadClass->" + testClazz);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Class testClazz2 = null ;
        try {
            testClazz2 = Class.forName("com.example.demoso1.Test");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Log.i("r0reflection", "Class.forName->"+testClazz2);
        Class testClazz3 = Test.class;
        Log.i("r0reflection", ".class->"+testClazz3.getName());

        try {
            Field publicStaticField_field = testClazz3.getDeclaredField("publicStaticField");
            Log.i("r0reflection", "testClazz3.getDeclaredField->"+publicStaticField_field);
            String value = (String)publicStaticField_field.get(null);
            Log.i("r0reflection", "publicStaticField_field.get->"+value);

            Field privateStaticField_field = testClazz3.getDeclaredField("privateStaticField");
            privateStaticField_field.setAccessible(true);
            privateStaticField_field.set(null,"modified");
            String valuePrivte = (String)privateStaticField_field.get(null);
            Log.i("r0reflection", "privateStaticField_field.get->"+valuePrivte);

        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
        Field[] fields = testClazz3.getDeclaredFields();
        for(Field i :fields){
            Log.i("r0reflection", "testClazz3.getDeclaredFields->"+i);
        }
        Field[] fields_2 = testClazz3.getFields();
        for(Field i :fields_2){
            Log.i("r0reflection", "testClazz3.getFields->"+i);
        }


    }


    public void testMethod(){
        Class testClazz = Test.class;

        Method publicStaticFunc_method = null;
        try {
            publicStaticFunc_method = testClazz.getDeclaredMethod("publicStaticFunc");
            Log.i("r0reflection", "testClazz.getDeclaredMethod->"+publicStaticFunc_method);
            publicStaticFunc_method.invoke(null);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        Method privateStaticFunc_method = null;
        try {
            privateStaticFunc_method = testClazz.getDeclaredMethod("privateStaticFunc");
            Log.i("r0reflection", "testClazz.getDeclaredMethod->"+privateStaticFunc_method);
            privateStaticFunc_method.setAccessible(true);
            privateStaticFunc_method.invoke(null);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        Method[] methods = testClazz.getMethods();
        for(Method i : methods){
            Log.i("r0reflection", "testClazz.getMethods()->"+i);
        }

        Method[] methods2= testClazz.getDeclaredMethods();
        for(Method i:methods2){
            Log.i("r0reflection", "testClazz.getDeclaredMethods->"+i);
        }

    };


    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */

    public static native String stringFromJNI();
    public static native String stringFromJNI2();
    public static native String myfirstjniJNI(String context);
    public native int myfirstjni();
    public native int init();

    /**
     * AES加密, CBC, PKCS5Padding
     */
    public static native String method01(String str);

    /**
     * AES解密, CBC, PKCS5Padding
     */
    public native String method02(String str);
}
