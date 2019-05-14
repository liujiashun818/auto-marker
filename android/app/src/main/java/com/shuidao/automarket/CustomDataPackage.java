package com.shuidao.automarket;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 向JS导出数据
 */
public class CustomDataPackage implements ReactPackage {

    //数据中心
    private static final class CustomDataBridge extends ReactContextBaseJavaModule {

        private Map<String, Object> dataMap = new HashMap<>();

        //构造方法
        public CustomDataBridge(ReactApplicationContext reactContext) {
            super(reactContext);
        }

        @Override
        public String getName() {
            return "CustomDataBridge";
        }

        @Override
        public Map<String, Object> getConstants() {

            //app信息
            String appVersion = "";
            String appSecondVersion = "";
            String appName = "";

            try {
                Context context = MainApplication.applicationContext;
                PackageManager packageManager = context.getPackageManager();
                PackageInfo packageInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
                appVersion = packageInfo.versionName;
                appSecondVersion = "" + packageInfo.versionCode;

                ApplicationInfo applicationInfo = packageManager.getApplicationInfo(context.getPackageName(), 0);
                appName = (String) packageManager.getApplicationLabel(applicationInfo);
            } catch (Exception e) {
                e.printStackTrace();
            }
            this.dataMap.put("appVersion", appVersion);
            this.dataMap.put("appSecondVersion", appSecondVersion);
            this.dataMap.put("appName", appName);
            //向JS导出打包模式
            this.dataMap.put("packageMode", "" + BuildConfig.__PACKAGE_MODE);
            return this.dataMap;
        }
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new CustomDataBridge(reactContext));

        return modules;
    }
}
