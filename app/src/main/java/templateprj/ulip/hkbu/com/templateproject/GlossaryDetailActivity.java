package templateprj.ulip.hkbu.com.templateproject;
import templateprj.ulip.hkbu.com.templateproject.splash.WTAActivity;
import templateprj.ulip.hkbu.com.templateproject.splash.WebAppInterface;

import android.annotation.SuppressLint;
import android.os.Handler;
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

import java.io.File;

@SuppressLint("SetJavaScriptEnabled")

public class GlossaryDetailActivity extends Activity {

    Activity activity;
    WebView webV;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_glossary_detail);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/web/gdetails.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new GlossaryDetailWebAppInterface(this), "Android");
        webV.setLongClickable(false);

        webV.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                webV.loadUrl("javascript:setIndex("
                        + "{\"key\":" + GlobalValue.glossaryDetail_key + ",\"data\":" + GlobalValue.glossaryDetail_data + "}, " +
                        "\"" + GlobalValue.glossary_selected_language + "\"" +
                        ")");

                if (BookmarksHelper.isAlreadyAddedToBookmarksWithString("glossary", GlobalValue.glossary_selected_language+":"+GlobalValue.glossaryDetail_key+","+GlobalValue.glossaryDetail_data ))
                    webV.loadUrl("javascript:setBookmarked(true)");
                else
                    webV.loadUrl("javascript:setBookmarked(false)");
            }
        });
    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        //intent.setClass(activity, TemplateActivity.class);
        activity.startActivity(intent);
    }

    public void addbm(String in_){
        Log.e("BM:", "in: "+in_ );
        if (BookmarksHelper.isAlreadyAddedToBookmarksWithString("glossary", in_)) {
            BookmarksHelper.removeBookmarkWithString("glossary", in_);
            new Handler().postDelayed(new Runnable() {
                public void run() {
                    runOnUiThread(new Runnable() {
                        public void run() {
                            GlobalValue.requestGlossaryRefresh=true;
                            webV.loadUrl("javascript:setBookmarked(false)");
                        }
                    });
                }
            }, 200);
        }
        else {
            BookmarksHelper.addBookmarkWithString("glossary", in_);
            new Handler().postDelayed(new Runnable() {
                public void run() {
                    runOnUiThread(new Runnable() {
                        public void run() {
                            GlobalValue.requestGlossaryRefresh=true;
                            webV.loadUrl("javascript:setBookmarked(true)");
                        }
                    });
                }
            }, 200);
        }
        //Log.e("BM:", "after: "+BookmarksHelper.getBookmarks("glossary") );
    }

}




class GlossaryDetailWebAppInterface extends WebAppInterface {

    GlossaryDetailActivity vc;

    public GlossaryDetailWebAppInterface(Activity c) {
        super(c);
        vc=(GlossaryDetailActivity)c;
    }

    @JavascriptInterface
    public void sToast(String str){
        vc.sToast(str);
    }

    @JavascriptInterface
    public void toNext(){ vc.toNext(); }

    @JavascriptInterface
    public void addbm(String in_){ vc.addbm(in_); }

}