package templateprj.ulip.hkbu.com.templateproject;
import templateprj.ulip.hkbu.com.templateproject.splash.WebAppInterface;
import org.json.*;

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

@SuppressLint("SetJavaScriptEnabled")

public class GlossaryActivity extends Activity {

    Activity activity;
    WebView webV;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_glossary);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/web/glossary.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new GlossaryWebAppInterface(this), "Android");
        webV.setLongClickable(false);


        webV.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {

                // Bookmark(ed) handler
                if (GlobalValue.isBM) {
                    webV.loadUrl("javascript:setIsInBM(true)");
                    GlobalValue.isBM=false;
                }else webV.loadUrl("javascript:setIsInBM(false)");

                if (GlobalValue.isSearching) {
                    webV.loadUrl("javascript:setTimeout(function(){document.getElementById('input_searchbar').focus();},10);");
                    GlobalValue.isSearching=false;
                }

                refreshBM(false);    //refresh bookmark

                // On-screen Tips handler
                String tip_page_name = "glossary";
                if (BookmarksHelper.isAlreadyAddedToBookmarksWithString("tips_shown", tip_page_name)) {
                    webV.loadUrl("javascript:show_tips(false);");
                }else{
                    webV.loadUrl("javascript:show_tips(true);");
                    BookmarksHelper.addBookmarkWithString("tips_shown",tip_page_name);
                }

            }
        });

        GlobalValue.glossary_selected_language = "eng"; //default game language is English
        GlobalValue.glossary_selected_subfield = "all"; //default subfield is all
    }

    public void onResume(){
        super.onResume();
        if(GlobalValue.requestGlossaryRefresh){
            refreshBM(true);
        }
    }

    public void refreshBM(boolean refresh){
        String eng_bm_str="";
        String chi_bm_str="";
        JSONArray jArr = BookmarksHelper.getBookmarks("glossary");
        try{
            for(int i=0; i<jArr.length(); i++){
                if(jArr.getString(i).contains("eng:")){
                    eng_bm_str =eng_bm_str + "\"" + jArr.getString(i).split(":")[1] + "\",";
                }
                if(jArr.getString(i).contains("chi:")){
                    chi_bm_str =chi_bm_str + "\"" + jArr.getString(i).split(":")[1] + "\",";
                }
            }
        }catch(Exception e){}
        if (eng_bm_str.length()>0)
            eng_bm_str = eng_bm_str.substring(0,eng_bm_str.length()-1); //remove final comma
        if (chi_bm_str.length()>0)
            chi_bm_str = chi_bm_str.substring(0,chi_bm_str.length()-1);      //remove final comma

        eng_bm_str="\"eng\":["+eng_bm_str+"]";
        chi_bm_str="\"chi\":["+chi_bm_str+"]";

        //Log.e("RBM:","-"+BookmarksHelper.getBookmarks("glossary") );
        //Log.e("RBM","-"+eng_bm_str);
        //Log.e("RBM","-"+chi_bm_str);
        //Log.e("RBM", "javascript:setBookmarks({"+eng_bm_str+","+chi_bm_str+"});");
        if(refresh)webV.loadUrl("javascript:setBookmarksWithRefresh({" + eng_bm_str + "," + chi_bm_str + "});");
        else webV.loadUrl("javascript:setBookmarks({" + eng_bm_str + "," + chi_bm_str + "});");
    }


    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        //intent.setClass(activity, TemplateActivity.class);
        activity.startActivity(intent);
    }

    public void toGlossaryDetail(){
        Intent intent=new Intent();
        intent.setClass(activity, GlossaryDetailActivity.class);
        activity.startActivity(intent);
    }
}




class GlossaryWebAppInterface extends WebAppInterface {

    GlossaryActivity vc;

    public GlossaryWebAppInterface(Activity c) {
        super(c);
        vc=(GlossaryActivity)c;
    }

    @JavascriptInterface
    public void sToast(String str){
        vc.sToast(str);
    }

    @JavascriptInterface
    public void toNext(){
        vc.toNext();
    }


    //Added for LSHK (2015.12.29)
    @JavascriptInterface
    public void todetailseng(String key, String data){
        GlobalValue.glossaryDetail_key = key;
        GlobalValue.glossaryDetail_data = data;
        GlobalValue.glossary_selected_language = "eng";
        vc.toGlossaryDetail();
    }
    @JavascriptInterface
    public void todetailschi(String key, String data){
        GlobalValue.glossaryDetail_key = key;
        GlobalValue.glossaryDetail_data = data;
        GlobalValue.glossary_selected_language = "chi";
        vc.toGlossaryDetail();
    }

    @JavascriptInterface
    public void nobm(){
        vc.sToast("No Bookmark added yet.");
    }

}