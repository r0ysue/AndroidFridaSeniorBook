#include <jni.h>
#include <pthread.h>
#include <string>
#include <android/log.h>
#include <sys/socket.h>
#include <unistd.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include "aes_utils.h"
#include "tools.h"
#include "junk.h"

#define NELEM(x) ((int) (sizeof(x) / sizeof((x)[0])))

#define APPNAME "FridaDetectionTest"

#define  TAG    "r0add"

// 定义info信息

#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,TAG,__VA_ARGS__)

// 定义debug信息

#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, TAG, __VA_ARGS__)

// 定义error信息

#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,TAG,__VA_ARGS__)

JNIEXPORT jstring JNICALL method02(JNIEnv *env, jobject jcls, jstring str_) {
    if (str_ == nullptr) return nullptr;

    const char *str = env->GetStringUTFChars(str_, JNI_FALSE);
    char *result = AES_128_CBC_PKCS5_Decrypt(str);

    env->ReleaseStringUTFChars(str_, str);

    jstring jResult = getJString(env, result);
    free(result);

    return jResult;
}

jstring JNICALL method01(JNIEnv *env, jclass jcls, jstring str_) {
    if (str_ == nullptr) return nullptr;

    const char *str = env->GetStringUTFChars(str_, JNI_FALSE);
    char *result = AES_128_CBC_PKCS5_Encrypt(str);

    env->ReleaseStringUTFChars(str_, str);

    jstring jResult = getJString(env, result);
    free(result);

    return jResult;
    //return method02(env,jcls,jResult);
}


int r0add(int x,int y){
    int i ;
    for (i = 0; i<x; i++){
        LOGI("now i is %i",i);
        i=i+y;
    }
    return i;
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_example_demoso1_MainActivity_stringFromJNI(
        JNIEnv* env,
        jclass clazz) {

    jclass testClass = env->FindClass("com/example/demoso1/Test");
    //jfieldID GetStaticFieldID(jclass clazz, const char* name, const char* sig)
    jfieldID publicStaticField = env->GetStaticFieldID(testClass,"publicStaticField","Ljava/lang/String;");
    jstring publicStaticField_value = (jstring)env->GetStaticObjectField(testClass,publicStaticField);

    const char* value_ptr = env->GetStringUTFChars(publicStaticField_value, nullptr);
    LOGI("now content is %s",value_ptr);

    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}



extern "C" JNIEXPORT jstring JNICALL
Java_com_example_demoso1_MainActivity_myfirstjniJNI(
        JNIEnv* env,
        jclass,jstring content ) {
    const char* a = env->GetStringUTFChars(content, nullptr);
    int content_size = env->GetStringUTFLength(content);
    if(a!=0){
        LOGI("now a is %s",a);
        LOGI("now content is %s",content);
    }
    env->ReleaseStringUTFChars(content,a);
    jstring result = env->NewStringUTF("Hello I`m from myfirstjnienv!");
    return result;
}


extern "C" JNIEXPORT jint JNICALL
Java_com_example_demoso1_MainActivity_myfirstjni(
        JNIEnv* env,
        jobject clazz) {
    return r0add(50,1);
}


void *detect_frida_loop(void *) {
    struct sockaddr_in sa;
    memset(&sa, 0, sizeof(sa));
    sa.sin_family = AF_INET;
    inet_aton("0.0.0.0", &(sa.sin_addr));
    int sock;
    int i;
    int ret;
    char res[7];
    while(1){
        /*
         * 1:Frida Server Detection
         */
        //LOGI("entering frida server detect loop started");
        for(i=20000;i<30000;i++){
            sock = socket(AF_INET,SOCK_STREAM,0);
            sa.sin_port = htons(i);
            LOGI("entering frida server detect loop started,now i is %d",i);

            if (connect(sock , (struct sockaddr*)&sa , sizeof sa) != -1) {
                memset(res, 0 , 7);
                send(sock, "\x00", 1, NULL);
                send(sock, "AUTH\r\n", 6, NULL);
                usleep(500); // Give it some time to answer
                if ((ret = recv(sock, res, 6, MSG_DONTWAIT)) != -1) {
                    if (strcmp(res, "REJECT") == 0) {
                        LOGI("FOUND FRIDA SERVER: %s,FRIDA DETECTED [1] - frida server running on port %d!",APPNAME,i);
                    }else{
                        LOGI("not FOUND FRIDA SERVER");
                    }
                }
            }
            close(sock);
        }
    }
}


extern "C" JNIEXPORT void JNICALL
Java_com_example_demoso1_MainActivity_init(
        JNIEnv* env,
        jobject clazz) {

    pthread_t t;
    pthread_create(&t,NULL,detect_frida_loop,(void*)NULL);

    LOGI("frida server detect loop started");
}

JNIEXPORT jstring JNICALL stringFromJNI2(
        JNIEnv* env,
        jclass clazz) {

    jclass testClass = env->FindClass("com/example/demoso1/Test");
    //jfieldID GetStaticFieldID(jclass clazz, const char* name, const char* sig)
    jfieldID publicStaticField = env->GetStaticFieldID(testClass,"publicStaticField","Ljava/lang/String;");
    jstring publicStaticField_value = (jstring)env->GetStaticObjectField(testClass,publicStaticField);

    const char* value_ptr = env->GetStringUTFChars(publicStaticField_value, nullptr);
    LOGI("now content is %s",value_ptr);


    std::string hello = "Hello from C++ stringFromJNI2";
    return env->NewStringUTF(hello.c_str());
}

JNIEXPORT jint JNI_OnLoad(JavaVM* vm, void* reserved){
    JNIEnv *env;
    vm->GetEnv((void **) &env, JNI_VERSION_1_6);
    JNINativeMethod methods[] = {
            {"stringFromJNI2", "()Ljava/lang/String;", (void *) stringFromJNI2},
            {"method01", "(Ljava/lang/String;)Ljava/lang/String;", (void *) method01},
            {"method02", "(Ljava/lang/String;)Ljava/lang/String;", (void *) method02},
    };
    env->RegisterNatives(env->FindClass("com/example/demoso1/MainActivity"), methods, NELEM(methods));
    return JNI_VERSION_1_6;
}