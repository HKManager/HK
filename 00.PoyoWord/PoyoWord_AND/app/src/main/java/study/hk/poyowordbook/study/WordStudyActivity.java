package study.hk.poyowordbook.study;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Map;

import Event.EventData;
import Query.Manager_WordBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.MainActivity;
import study.hk.poyowordbook.R;
import study.hk.poyowordbook.manager.WordAudLocActivity;
import study.hk.poyowordbook.manager.WordBookDetailActivity;

import com.kakao.sdk.newtoneapi.SpeechRecognizeListener;
import com.kakao.sdk.newtoneapi.SpeechRecognizerActivity;
import com.kakao.sdk.newtoneapi.SpeechRecognizerClient;
import com.kakao.sdk.newtoneapi.SpeechRecognizerManager;
import com.kakao.sdk.newtoneapi.impl.util.PermissionUtils;

public class WordStudyActivity extends AppCompatActivity {

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
        setContentView(R.layout.activity_word_study);

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
        lWebView.addJavascriptInterface(new study.hk.poyowordbook.study.WordStudyActivity.JavaScriptBridge(), "android");
        //lWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        lWebView.loadUrl("file:///android_asset/Poyo/study/WordStudyRoom.html");
        //lWebView.loadUrl("file:///android_asset/Poyo/AGrid/index.html");
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
                                case HARDCODE.단어장상세 :
                                    intent =new Intent(study.hk.poyowordbook.study.WordStudyActivity.this,WordBookDetailActivity.class);
                                    startActivity(intent);
                                    break;
                                case HARDCODE.메인화면 :
                                    intent =new Intent(study.hk.poyowordbook.study.WordStudyActivity.this,MainActivity.class);
                                    startActivity(intent);
                                    break;
                                case HARDCODE.단어장배치관리 :
                                    intent =new Intent(study.hk.poyowordbook.study.WordStudyActivity.this,WordAudLocActivity.class);
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
