package study.hk.poyowordbook.manager;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.WebView;

import android.os.Handler;
import android.webkit.WebViewClient;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Map;

import Event.EventData;
import Query.Manager_WordBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.MainActivity;
import study.hk.poyowordbook.R;

public class WordAudLocDetailActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;
    private WebView lWebView = null;
    private Manager_WordBook wordBook;

    private Gson gson = new Gson();

    private Intent intent;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_aud_loc_detail);

        context = getApplicationContext();
        wordBook = new Manager_WordBook(context);

        lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) { }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {
                ArrayList<Map> list = wordBook.Search();
                String jsonResult = gson.toJson(list);

                EventData data = new EventData();

                data.SetHandle(HARDCODE.전체조회);
                data.SetView(HARDCODE.단어장관리);
                data.SetValue(list);

                String JsonEventData = gson.toJson(data);

                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
            }

            public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                return true;
            }
        });
        lWebView.getSettings().setJavaScriptEnabled(true);
        lWebView.addJavascriptInterface(new WordAudLocDetailActivity.JavaScriptBridge(), "android");
        //lWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        lWebView.loadUrl("file:///android_asset/Poyo/manager/WordAudLocDetail.html");
    }

    private class JavaScriptBridge {
        @android.webkit.JavascriptInterface
        public void setData(final String arg) {
            handler.post(new Runnable() {
                public void run() {
                    //Toast.makeText(context, arg, Toast.LENGTH_LONG).show();
                    //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");

                    EventData parse = gson.fromJson(arg, EventData.class);

                    switch (parse.handle) {
                        case HARDCODE.화면호출 :
                            switch (parse.data) {
                                case HARDCODE.단어장배치관리 :
                                    intent =new Intent(WordAudLocDetailActivity.this,WordAudLocActivity.class);
                                    startActivity(intent);
                                    break;
                            }
                            break;
                        case HARDCODE.전체조회 :
                            ArrayList<Map> list = wordBook.Search();
                            String jsonResult = gson.toJson(list);

                            EventData data = new EventData();

                            data.SetHandle(HARDCODE.전체조회);
                            data.SetView(HARDCODE.단어장관리);
                            data.SetValue(list);

                            String JsonEventData = gson.toJson(data);

                            lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
                            break;
                    }
                }
            });
        }
    }
}
