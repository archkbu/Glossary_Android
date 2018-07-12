package templateprj.ulip.hkbu.com.templateproject;
import templateprj.ulip.hkbu.com.templateproject.splash.WebAppInterface;

import android.annotation.SuppressLint;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.content.pm.ActivityInfo;

@SuppressLint("SetJavaScriptEnabled")

public class ResultActivity extends Activity {

    Activity activity;
    WebView webV;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_result);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/web/result.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new ResultWebAppInterface(this), "Android");
        webV.setLongClickable(false);

        //Log.e("bello",GlobalValue.anslist_str);

        webV.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                if(GlobalValue.game_selected.equals("TT"))webV.loadUrl("javascript:setResultArr(" + GlobalValue.anslist_str + ",false);");
                else webV.loadUrl("javascript:setResultArr(" + GlobalValue.anslist_str + ",true);");
            }
        });
    }

    @Override
    public void onBackPressed() {}

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        //intent.setClass(activity, TemplateActivity.class);
        activity.startActivity(intent);
    }

    public void toback(){
        GlobalValue.requestGameBack=true;
        finish();
    }
    public void tonew(int lv){
        GlobalValue.requestGameRefresh=true;
        GlobalValue.glv=lv;
        finish();
    }
}




class ResultWebAppInterface extends WebAppInterface {

    ResultActivity vc;

    public ResultWebAppInterface(Activity c) {
        super(c);
        vc=(ResultActivity)c;
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
    public void toback(){
        vc.toback();
    }
    @JavascriptInterface
    public void tonew(int lv){
        vc.tonew(lv);
    }
}