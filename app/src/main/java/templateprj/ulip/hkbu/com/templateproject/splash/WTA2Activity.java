package templateprj.ulip.hkbu.com.templateproject.splash;
import templateprj.ulip.hkbu.com.templateproject.R;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.webkit.JavascriptInterface;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;


@SuppressLint("SetJavaScriptEnabled")

public class WTA2Activity extends Activity {

    Activity activity;
    WebView webV;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_wta2);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/splash_web/wta2vc.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new WTA2WebAppInterface(this), "Android");
        webV.setLongClickable(false);
    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void closePage(){
        finish();
    }

}




class WTA2WebAppInterface extends WebAppInterface {

    WTA2Activity vc;

    public WTA2WebAppInterface(Activity c) {
        super(c);
        vc=(WTA2Activity)c;
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