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

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

@SuppressLint("SetJavaScriptEnabled")

public class GameActivity extends Activity {

    Activity activity;
    WebView webV;
    int bmCount_eng=0;
    int bmCount_chi=0;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE); // Title or not.
        setContentView(R.layout.activity_game);

        activity=this;
        webV=(WebView)findViewById(R.id.webV);
        WebSettings webSettings = webV.getSettings();
        webV.loadUrl("file:///android_asset/web/game.html");
        webV.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webV.setVerticalScrollBarEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webV.getSettings().setJavaScriptEnabled(true);
        webV.addJavascriptInterface(new GameWebAppInterface(this), "Android");
        webV.setLongClickable(false);

        GlobalValue.game_selected_language = "eng"; //default game language is English
        GlobalValue.game_selected_subfield = "all"; //default subfield is all

        webV.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                // On-screen Tips handler
                String tip_page_name = "game";
                if (BookmarksHelper.isAlreadyAddedToBookmarksWithString("tips_shown", tip_page_name)) {
                    webV.loadUrl("javascript:show_tips(false);");
                }else{
                    webV.loadUrl("javascript:show_tips(true);");
                    BookmarksHelper.addBookmarkWithString("tips_shown",tip_page_name);
                }
            }
        });

        try{
            JSONArray bmJArr=BookmarksHelper.getBookmarks("glossary");
            ArrayList<String> engbms=new ArrayList<String>();
            for(int i=0; i<bmJArr.length(); i++){
                if(bmJArr.getString(i).indexOf("eng")!=-1){
                    engbms.add(bmJArr.getString(i));
                }
            }
            bmCount_eng=engbms.size();
            ArrayList<String> chibms=new ArrayList<String>();
            for(int i=0; i<bmJArr.length(); i++){
                if(bmJArr.getString(i).indexOf("chi")!=-1){
                    chibms.add(bmJArr.getString(i));
                }
            }
            bmCount_chi=chibms.size();
        }catch(Exception e){}

    }

    public void sToast(String str){
        Toast.makeText(this, str, Toast.LENGTH_LONG).show();
    }

    public void toNext(){
        Intent intent=new Intent();
        //intent.setClass(activity, TemplateActivity.class);
        activity.startActivity(intent);
    }

    public void toMU(){
        if( !GlobalValue.game_selected_subfield.equals("bookmarked") || ((GlobalValue.game_selected_language.equals("eng") && bmCount_eng>=10) || (GlobalValue.game_selected_language.equals("chi") && bmCount_chi>=10))){
            GlobalValue.game_selected = "MU";
            Intent intent=new Intent();
            intent.setClass(activity, MultipleChoiceActivity.class);
            activity.startActivity(intent);
        }else{
            String lang2="English";
            if(GlobalValue.game_selected_language.equals("chi"))lang2="Chinese";
            sToast("You need at least 10 bookmarked "+lang2+" terms to play the game. Please bookmark more terms and try again.");
        }
    }

    public void toTT(){
        if( !GlobalValue.game_selected_subfield.equals("bookmarked") || ((GlobalValue.game_selected_language.equals("eng") && bmCount_eng>=10) || (GlobalValue.game_selected_language.equals("chi") && bmCount_chi>=10))){
            GlobalValue.game_selected = "TT";
            Intent intent=new Intent();
            intent.setClass(activity, TypeTranslationActivity.class);
            activity.startActivity(intent);
        }else{
            String lang2="English";
            if(GlobalValue.game_selected_language.equals("chi"))lang2="Chinese";
            sToast("You need at least 10 bookmarked "+lang2+" terms to play the game. Please bookmark more terms and try again.");
        }
    }

    public void setchi(){
        GlobalValue.game_selected_language = "chi";
    }
    public void seteng(){
        GlobalValue.game_selected_language = "eng";
    }
    public void setsubfield(String subfield){
        GlobalValue.game_selected_subfield = subfield;
    }

}




class GameWebAppInterface extends WebAppInterface {

    GameActivity vc;

    public GameWebAppInterface(Activity c) {
        super(c);
        vc=(GameActivity)c;
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
    public void toMU(){ //multiple choice game
        vc.toMU();
    }

    @JavascriptInterface
    public void toTT(){ //type translation game
        vc.toTT();
    }

    @JavascriptInterface
    public void setchi(){ //type translation game
        vc.setchi();
    }

    @JavascriptInterface
    public void seteng(){ //type translation game
        vc.seteng();
    }

    @JavascriptInterface
    public void setsubfield(String subfield){ //type translation game
        vc.setsubfield(subfield);
    }
}