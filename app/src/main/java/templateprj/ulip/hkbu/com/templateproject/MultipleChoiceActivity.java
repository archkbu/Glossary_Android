package templateprj.ulip.hkbu.com.templateproject;
import templateprj.ulip.hkbu.com.templateproject.splash.WebAppInterface;

import android.os.Handler;
import android.util.Log;
import android.annotation.SuppressLint;
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

import org.json.JSONArray;

@SuppressLint("SetJavaScriptEnabled")

public class MultipleChoiceActivity extends Activity {

    Activity activity;
    WebView webV;
    int glv=0;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_multiple_choice);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/web/play_mc.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new MultipleChoiceWebAppInterface(this), "Android");
        webV.setLongClickable(false);
        webV.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {

                // Init game (with language, subfield)
                webV.loadUrl("javascript:initGame(" +
                                "'" + GlobalValue.game_selected_language + "'," +
                                "'" + GlobalValue.game_selected_subfield + "'," +
                                refreshBM()+"," + glv + ");"
                );
                //Log.e("bello",refreshBM());

                //Log.e("bello","hi "+glv);

                // On-screen Tips handler
                String tip_page_name = "multiple_choice";
                if (BookmarksHelper.isAlreadyAddedToBookmarksWithString("tips_shown", tip_page_name)) {
                    webV.loadUrl("javascript:show_tips(false);");
                }else{
                    webV.loadUrl("javascript:show_tips(true);");
                    BookmarksHelper.addBookmarkWithString("tips_shown",tip_page_name);
                }
            }
        });
    }

    public String refreshBM(){
        String eng_bm_str="";
        String chi_bm_str="";
        JSONArray jArr = BookmarksHelper.getBookmarks("glossary");
        try{
            for(int i=0; i<jArr.length(); i++){
                if(jArr.getString(i).contains("eng:"))eng_bm_str =eng_bm_str + "\"" + jArr.getString(i).split(":")[1] + "\",";
                if(jArr.getString(i).contains("chi:"))chi_bm_str =chi_bm_str + "\"" + jArr.getString(i).split(":")[1] + "\",";
            }
        }catch(Exception e){}
        if(eng_bm_str.length()>0)eng_bm_str = eng_bm_str.substring(0,eng_bm_str.length()-1);
        if(chi_bm_str.length()>0)chi_bm_str = chi_bm_str.substring(0,chi_bm_str.length()-1);
        eng_bm_str="\"eng\":["+eng_bm_str+"]";
        chi_bm_str="\"chi\":["+chi_bm_str+"]";
        return "{" + eng_bm_str + "," + chi_bm_str + "}";
    }

    public void onResume(){
        super.onResume();
        if(GlobalValue.requestGameRefresh){
            webV.loadUrl("file:///android_asset/web/play_mc.html");
            glv=GlobalValue.glv;
            GlobalValue.requestGameRefresh=false;
        }
        if(GlobalValue.requestGameBack){
            GlobalValue.requestGameBack=false;
            finish();
        }
    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        //intent.setClass(activity, TemplateActivity.class);
        activity.startActivity(intent);
    }


    public void toresult(String anslist){
        GlobalValue.anslist_str = anslist;
        Intent intent=new Intent();
        intent.setClass(activity, ResultActivity.class);
        activity.startActivity(intent);
    }


    public void addbm(String in_){
        //Log.e("BM:", "before: " + BookmarksHelper.getBookmarks("glossary"));
        if (BookmarksHelper.isAlreadyAddedToBookmarksWithString("glossary", in_)) {
            BookmarksHelper.removeBookmarkWithString("glossary", in_);
            new Handler().postDelayed(new Runnable() {
                public void run() {
                    runOnUiThread(new Runnable() {
                        public void run() {
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
                            webV.loadUrl("javascript:setBookmarked(true)");
                        }
                    });
                }
            }, 200);
        }
        //Log.e("BM:", "after: " + BookmarksHelper.getBookmarks("glossary"));
    }
}




class MultipleChoiceWebAppInterface extends WebAppInterface {

    MultipleChoiceActivity vc;

    public MultipleChoiceWebAppInterface(Activity c) {
        super(c);
        vc=(MultipleChoiceActivity)c;
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
    public void toresult(String anslist){
        vc.toresult(anslist);
    }

    @JavascriptInterface
    public void addbm(String in_){ vc.addbm(in_);}

}