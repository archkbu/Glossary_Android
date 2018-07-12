package templateprj.ulip.hkbu.com.templateproject.splash;
import templateprj.ulip.hkbu.com.templateproject.BookmarksHelper;
import templateprj.ulip.hkbu.com.templateproject.DeviceAPI;
import templateprj.ulip.hkbu.com.templateproject.GlobalValue;
import templateprj.ulip.hkbu.com.templateproject.HomeActivity;
import templateprj.ulip.hkbu.com.templateproject.R;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.os.Handler;
import android.content.pm.ActivityInfo;
import java.io.File;
import android.util.Log;

public class MainActivity extends Activity {

    Activity activity;
    WebView webV;
    Handler mHandler;
    Runnable myTask;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        setContentView(R.layout.activity_main);

        activity=this;
        DeviceAPI.init(activity);
        DeviceAPI.addActivity(activity);
        BookmarksHelper.useBookmarks("glossary");
        BookmarksHelper.useBookmarks("tips_shown");
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/splash_web/index.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new FirstWebAppInterface(this), "Android");
        webV.setLongClickable(false);

        toNext();
    }

    public void toNext(){
        new Handler().postDelayed(new Runnable() {
            public void run() {
                /*Intent intent = new Intent();
                intent.setClass(activity, UniversityActivity.class);
                activity.startActivity(intent);*/ //new splash screen > check first use here
                File usedfile=new File(DeviceAPI.appdir,"usedfile.json");
                Intent intent = new Intent();
                if(!usedfile.exists() || GlobalValue.isOnDemo)intent.setClass(activity, WTAActivity.class);
                else intent.setClass(activity, HomeActivity.class);
                activity.startActivity(intent);
                finish();
            }
        }, 5000);
    }

}




class FirstWebAppInterface extends WebAppInterface {

    MainActivity vc;

    public FirstWebAppInterface(Activity c) {
        super(c);
        vc=(MainActivity)c;
    }

}