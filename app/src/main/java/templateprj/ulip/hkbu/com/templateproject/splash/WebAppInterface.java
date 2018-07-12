package templateprj.ulip.hkbu.com.templateproject.splash;

import android.app.Activity;
import android.widget.Toast;
import android.webkit.JavascriptInterface;

public class WebAppInterface {

    Activity mContext;

    public WebAppInterface(Activity c) {
        mContext=c;
    }

    @JavascriptInterface
    public void toBack() {
        mContext.finish();
    }

    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
    }

}
