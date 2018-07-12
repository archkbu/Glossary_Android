package templateprj.ulip.hkbu.com.templateproject.splash;
import templateprj.ulip.hkbu.com.templateproject.DeviceAPI;
import templateprj.ulip.hkbu.com.templateproject.GlobalValue;
import templateprj.ulip.hkbu.com.templateproject.R;
import templateprj.ulip.hkbu.com.templateproject.HomeActivity;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.os.Handler;
import android.webkit.JavascriptInterface;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.File;


@SuppressLint("SetJavaScriptEnabled")

public class PasswordActivity extends Activity {

    Activity activity;
    WebView webV;
    File usedfile;
    private boolean doubleBackToExitPressedOnce;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_password);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/splash_web/password.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new PasswordWebAppInterface(this), "Android");
        webV.setLongClickable(false);
        webV.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                webV.loadUrl("javascript:setAppPassword('" + GlobalValue.appPassword + "')");
            }
        });

        usedfile=new File(DeviceAPI.appdir,"usedfile.json");
    }

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            DeviceAPI.closeApp();
            finish();
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
        DeviceAPI.saveTextFile("{\"used\":1}",usedfile);
        Intent intent=new Intent();
        intent.setClass(activity, HomeActivity.class);
        activity.startActivity(intent);
        finish();
    }

}




class PasswordWebAppInterface extends WebAppInterface {

    PasswordActivity vc;

    public PasswordWebAppInterface(Activity c) {
        super(c);
        vc=(PasswordActivity)c;
    }

    @JavascriptInterface
    public void sToast(String str){
        vc.sToast(str);
    }

    @JavascriptInterface
    public void toNext(){
        vc.toNext();
    }

    @JavascriptInterface
    public void wrongPassword(){
        vc.sToast("Wrong Password");
    }

    @JavascriptInterface
    public void emptyPassword(){
        vc.sToast("Please enter the password");
    }

}