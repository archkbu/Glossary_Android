package templateprj.ulip.hkbu.com.templateproject;
import templateprj.ulip.hkbu.com.templateproject.splash.AboutActivity;
import templateprj.ulip.hkbu.com.templateproject.splash.WTA2Activity;
import templateprj.ulip.hkbu.com.templateproject.splash.WebAppInterface;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import android.content.pm.ActivityInfo;

import org.json.JSONArray;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;


@SuppressLint("SetJavaScriptEnabled")

public class HomeActivity extends Activity {

    Activity activity;
    WebView webV;
    private boolean doubleBackToExitPressedOnce;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_home);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/web/home_1.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new HomeWebAppInterface(this), "Android");
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
        //intent.setClass(activity, TemplateActivity.class);
        activity.startActivity(intent);
    }

    public void toWTA2(){
        Intent intent=new Intent();
        intent.setClass(activity, WTA2Activity.class);
        activity.startActivity(intent);
    }

    public void toAbout(){
        Intent intent=new Intent();
        intent.setClass(activity, AboutActivity.class);
        activity.startActivity(intent);
    }


    //Added for LSHK (2015.12.28)
    //BM=Bookmark | GA=Game | CT=Glossary

    public void toCT(){
        GlobalValue.isBM=false;
        GlobalValue.isSearching=false;
        Intent intent=new Intent();
        intent.setClass(activity, GlossaryActivity.class);
        activity.startActivity(intent);
    }
    public void toGA(){
        GlobalValue.isBM=false;
        GlobalValue.isSearching=false;
        Intent intent=new Intent();
        intent.setClass(activity, GameActivity.class);
        activity.startActivity(intent);
    }
    public void toBM(){
        GlobalValue.isBM=true;
        GlobalValue.isSearching=false;
        Intent intent=new Intent();
        intent.setClass(activity, GlossaryActivity.class);
        activity.startActivity(intent);
    }

    public void toSE(){
        GlobalValue.isBM=false;
        GlobalValue.isSearching=true;
        Intent intent=new Intent();
        intent.setClass(activity, GlossaryActivity.class);
        activity.startActivity(intent);
    }


}




class HomeWebAppInterface extends WebAppInterface {

    HomeActivity vc;

    public HomeWebAppInterface(Activity c) {
        super(c);
        vc=(HomeActivity)c;
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
    public void toWTA2(){
        vc.toWTA2();
    }

    @JavascriptInterface
    public void toAbout(){
        vc.toAbout();
    }



    //Added for LSHK (2015.12.28)
    @JavascriptInterface
    public void toCT(){
        vc.toCT();
    }

    @JavascriptInterface
    public void toGA(){
        vc.toGA();
    }

    @JavascriptInterface
    public void toBM()
    {
        vc.toBM();
    }

    @JavascriptInterface
    public void toSE(){
        vc.toSE();
    }

}