package templateprj.ulip.hkbu.com.templateproject.splash;

import android.annotation.SuppressLint;
import android.webkit.JavascriptInterface;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import android.content.pm.ActivityInfo;

import templateprj.ulip.hkbu.com.templateproject.DeviceAPI;
import templateprj.ulip.hkbu.com.templateproject.R;

@SuppressLint("SetJavaScriptEnabled")

public class AboutActivity extends Activity {

    Activity activity;
    WebView webV;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_about);

        activity=this;
        activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/splash_web/about2vc.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new AboutWebAppInterface(this), "Android");
        webV.setLongClickable(false);
    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void closePage(){
        finish();
    }

}




class AboutWebAppInterface extends WebAppInterface {

    AboutActivity vc;

    public AboutWebAppInterface(Activity c) {
        super(c);
        vc=(AboutActivity)c;
    }

    @JavascriptInterface
    public void sToast(String str){
        vc.sToast(str);
    }

    @JavascriptInterface
    public void closePage(){
        vc.closePage();
    }

}