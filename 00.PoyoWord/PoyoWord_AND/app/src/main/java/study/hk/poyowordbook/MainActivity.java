package study.hk.poyowordbook;

import android.content.Context;
import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.WebViewClient;
import android.webkit.WebView;
import android.os.Handler;
import android.widget.Toast;
import android.annotation.SuppressLint;


public class MainActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;

    private WebView lWebView = null;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 코드상에서 액티비티 화면에 타이틀을 없애줌. 매니페스트에서도 가능.
        //requestWindowFeature(Window.FEATURE_NO_TITLE);

        context = getApplicationContext();

        lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {

            }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {
                lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");
            }

            public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                //lWebView.loadUrl("javascript:setMessage('" + message + "')");
                //result.confirm();
                return true;
            }
        });
        lWebView.getSettings().setJavaScriptEnabled(true);
        lWebView.addJavascriptInterface(new JavaScriptBridge(), "android");
        //lWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        //lWebView.loadUrl("http://naver.com");
        lWebView.loadUrl("file:///android_asset/Poyo/game/BattleMonster/index.html");

    }

    private class JavaScriptBridge {
        @android.webkit.JavascriptInterface
        public void setMessage(final String arg) {
            handler.post(new Runnable() {
                public void run() {
                    Toast.makeText(context, arg, Toast.LENGTH_LONG).show();
                    lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");
                }
            });
        }
    }
}
