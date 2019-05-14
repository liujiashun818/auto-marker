package com.shuidao.automarket;

import android.app.Application;
import android.content.Context;

import com.beefe.picker.PickerViewPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.theweflex.react.WeChatPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;
import com.xiaomi.push.reactnative.MiPushPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    public static Context applicationContext;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RCTCameraPackage(),
            new WeChatPackage(),
            new RNViewShotPackage(),
                    new PickerViewPackage(),
                    new RNSpinkitPackage(),
                    new ReactNativePermissionsPackage(),
                    new RNFSPackage(),
                    BugsnagReactNative.getPackage(),
                    new MiPushPackage(BuildConfig.__MIPUSH_APP_ID, BuildConfig.__MIPUSH_APP_KEY),
                    new VectorIconsPackage(),
                    new PickerPackage(),
                    new ImagePickerPackage(),
                    new RNDeviceInfo(),
                    //向JS导出数据
                    new CustomDataPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        applicationContext = this;
        SoLoader.init(this, /* native exopackage */ false);
    }
}
