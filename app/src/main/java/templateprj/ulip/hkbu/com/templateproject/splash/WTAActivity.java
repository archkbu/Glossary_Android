package templateprj.ulip.hkbu.com.templateproject.splash;
import templateprj.ulip.hkbu.com.templateproject.DeviceAPI;
import templateprj.ulip.hkbu.com.templateproject.R;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import android.os.Handler;


@SuppressLint("SetJavaScriptEnabled")

public class WTAActivity extends Activity {

    Activity activity;
    WebView webV;
    boolean doubleBackToExitPressedOnce;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_wta);

        activity=this;
        DeviceAPI.addActivity(activity);
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/splash_web/wtavc.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new WTAWebAppInterface(this), "Android");
        webV.setLongClickable(false);
    }

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            DeviceAPI.closeApp();
            return;
        }
        this.doubleBackToExitPressedOnce = true;
        new Handler().postDelayed(new Runnable() {
            public void run() {
                doubleBackToExitPressedOnce=false;
            }
        }, 2000);
        Toast.makeText(this, "Tap BACK again to exit", Toast.LENGTH_SHORT).show();
    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        intent.setClass(activity, AgreeActivity.class);
        activity.startActivity(intent);
    }

}




class WTAWebAppInterface extends WebAppInterface {

    WTAActivity vc;

    public WTAWebAppInterface(Activity c) {
        super(c);
        vc=(WTAActivity)c;
    }

    @JavascriptInterface
    public void toNext(){
        vc.toNext();
    }

}