package templateprj.ulip.hkbu.com.templateproject.splash;
import templateprj.ulip.hkbu.com.templateproject.DeviceAPI;
import templateprj.ulip.hkbu.com.templateproject.GlobalValue;
import templateprj.ulip.hkbu.com.templateproject.HomeActivity;
import templateprj.ulip.hkbu.com.templateproject.R;

import android.os.Handler;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.webkit.WebView;
import android.content.pm.ActivityInfo;

import java.io.File;


public class UniversityActivity extends Activity {

    Activity activity;
    WebView webV;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_university);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        webV.loadUrl("file:///android_asset/splash_web/university.html");
        webV.setLongClickable(false);

        toNext();
    }

    @Override
    public void onBackPressed(){}

    public void toNext(){
        new Handler().postDelayed(new Runnable() {
            public void run() {
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