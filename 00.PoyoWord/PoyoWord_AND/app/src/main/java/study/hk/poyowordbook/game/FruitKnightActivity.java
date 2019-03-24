package study.hk.poyowordbook.game;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.webkit.JsResult;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.ArrayList;
import java.util.Map;

import Event.EventData;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.R;
import study.hk.poyowordbook.manager.WordBookActivity;

public class FruitKnightActivity extends AppCompatActivity {

    private WebView lWebView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fruit_knight);

        lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) { }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {
               /* ArrayList<Map> list = wordBook.Search();
                String jsonResult = gson.toJson(list);

                EventData data = new EventData();

                data.SetHandle(HARDCODE.전체조회);
                data.SetView(HARDCODE.단어장관리);
                data.SetValue(list);

                String JsonEventData = gson.toJson(data);

                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");*/
            }

            public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                return true;
            }
        });
        lWebView.getSettings().setJavaScriptEnabled(true);
       /* lWebView.addJavascriptInterface(new WordBookActivity.JavaScriptBridge(), "android");*/
        //lWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        lWebView.loadUrl("file:///android_asset/Poyo/game/FruitKnight/index.html");
        //lWebView.loadUrl("file:///android_asset/Poyo/ASlide/index.html");

        //키보드 보이게 하는 부분
/*        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.toggleSoftInput(InputMethodManager.RESULT_SHOWN,InputMethodManager.RESULT_SHOWN); //강제로 키보드 보이기*/

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

    @Override public void onBackPressed() {
        //super.onBackPressed();
    }

    @Override
    public boolean onKeyPreIme(int keyCode, KeyEvent event) {

        /*if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {

            if (handler != null) {

                if (event.getAction() == KeyEvent.ACTION_DOWN) {
                    handler.sendEmptyMessage(InputMethodManager.RESULT_HIDDEN);
                }
            }

            if (isHiddenKeyboard == false) {
                return true;
            }
        }*/

        return super.dispatchKeyEvent(event);
    }



    public void setHiddenKeyboardOnBackPressed(boolean isHiddenKeyboard) {
        this.isHiddenKeyboard = isHiddenKeyboard;
    }



    /**
     * back 버튼 후 실행될 핸들러 지정
     * @param handler back 버튼 후 실행될 핸들러
     */
    public void setOnBackPressedHandler(Handler handler) {
        this.handler = handler;
    }
}
