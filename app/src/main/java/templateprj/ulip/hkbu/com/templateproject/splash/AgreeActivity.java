package templateprj.ulip.hkbu.com.templateproject.splash;
import templateprj.ulip.hkbu.com.templateproject.DeviceAPI;
import templateprj.ulip.hkbu.com.templateproject.GlobalValue;
import templateprj.ulip.hkbu.com.templateproject.R;
import templateprj.ulip.hkbu.com.templateproject.HomeActivity;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.webkit.JavascriptInterface;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import java.io.File;


@SuppressLint("SetJavaScriptEnabled")

public class AgreeActivity extends Activity {

    Activity activity;
    WebView webV;
    File usedfile;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        setContentView(R.layout.activity_agree);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/splash_web/agreevc.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new AgreeWebAppInterface(this), "Android");
        webV.setLongClickable(false);

        usedfile=new File(DeviceAPI.appdir,"usedfile.json");
    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        if(GlobalValue.isNeedPassword){
            intent.setClass(activity, PasswordActivity.class);
        }else{
            DeviceAPI.saveTextFile("{\"used\":1}",usedfile);
            intent.setClass(activity, HomeActivity.class);
        }
        activity.startActivity(intent);
        finish();
    }

}




class AgreeWebAppInterface extends WebAppInterface {

    AgreeActivity vc;

    public AgreeWebAppInterface(Activity c) {
        super(c);
        vc=(AgreeActivity)c;
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
    public void toBack(){
        vc.finish();
    }

    @JavascriptInterface
    public void showUnchecked(){
        vc.sToast("Please check the box.");
    }

}