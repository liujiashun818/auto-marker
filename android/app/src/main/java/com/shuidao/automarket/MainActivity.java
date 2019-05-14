package com.shuidao.automarket;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;
import com.xiaomi.mipush.sdk.MiPushMessage;
import com.xiaomi.mipush.sdk.PushMessageHelper;
import com.xiaomi.push.reactnative.MiPushModule;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends ReactActivity {

    private MiPushMessage message = null;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AutoMarket";
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initCookie();

        //小米推送
        Intent i = this.getIntent();
        message = (MiPushMessage) i.getSerializableExtra(PushMessageHelper.KEY_MESSAGE);
        if (message != null) {
            TimerTask task = new TimerTask() {
                public void run() {
                    Bundle bundle = new Bundle();
                    bundle.putString("type", MiPushModule.MiPush_didNotificationMessageClicked);
                    bundle.putString("data", message.toString());
                    bundle.putString("messageId", message.getMessageId());
                    MiPushModule.sendEvent(bundle);
                }
            };
            Timer timer = new Timer();
            timer.schedule(task, 2000);
        }
    }

    @Override
    public void onResume() {
        super.onResume();

        //Umeng友盟统计
        MobclickAgent.onResume(this);
    }

    public void onPause() {
        super.onPause();

        //Umeng友盟统计
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onStop() {
        saveCookie();
        super.onStop();
    }

    private void initCookie() {
        if (Build.VERSION.SDK_INT < 21) CookieSyncManager.createInstance(this);
    }

    private void saveCookie() {
        if (Build.VERSION.SDK_INT < 21) CookieSyncManager.getInstance().sync();
        else CookieManager.getInstance().flush();
    }

}
