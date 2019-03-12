package study.hk.poyowordbook.study;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
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

public class WordStudyActivity extends AppCompatActivity  implements  SpeechRecognizeListener{

    private final Handler handler = new Handler();
    private Context context = null;
    private WebView lWebView = null;
    private Manager_WordBook wordBook;

    private Gson gson = new Gson();

    private Intent intent;

    String serviceType = SpeechRecognizerClient.SERVICE_TYPE_WEB;
    private SpeechRecognizerClient client;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_study);

        SpeechRecognizerManager.getInstance().initializeLibrary(this);

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

    @Override
    public void onDestroy() {
        super.onDestroy();

        // API를 더이상 사용하지 않을 때 finalizeLibrary()를 호출한다.
        SpeechRecognizerManager.getInstance().finalizeLibrary();
    }

    private void SpeechToText() {
        if(PermissionUtils.checkAudioRecordPermission(this)) {

            SpeechRecognizerClient.Builder builder = new SpeechRecognizerClient.Builder().
                    setServiceType(serviceType);

            if (serviceType.equals(SpeechRecognizerClient.SERVICE_TYPE_WORD)) {
            }

            client = builder.build();

            client.setSpeechRecognizeListener(this);
            client.startRecording(true);
        }
    }

    @Override
    public void onReady() {

    }

    @Override
    public void onBeginningOfSpeech() {

    }

    @Override
    public void onEndOfSpeech() {

    }

    @Override
    public void onError(int errorCode, String errorMsg) {
        //TODO implement interface DaumSpeechRecognizeListener method
        Log.e("SpeechSampleActivity", "onError");
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
            }
        });

        client = null;
    }

    @Override
    public void onPartialResult(String partialResult) {

    }

    @Override
    public void onResults(Bundle results) {
        final StringBuilder builder = new StringBuilder();
        Log.i("SpeechSampleActivity", "onResults");

        ArrayList<String> texts = results.getStringArrayList(SpeechRecognizerClient.KEY_RECOGNITION_RESULTS);
        ArrayList<Integer> confs = results.getIntegerArrayList(SpeechRecognizerClient.KEY_CONFIDENCE_VALUES);

        for (int i = 0; i < texts.size(); i++) {
            builder.append(texts.get(i));
            builder.append(" (");
            builder.append(confs.get(i).intValue());
            builder.append(")\n");
        }

        final Activity activity = this;
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                // finishing일때는 처리하지 않는다.
                if (activity.isFinishing()) return;

                AlertDialog.Builder dialog = new AlertDialog.Builder(activity).
                        setMessage(builder.toString()).
                        setPositiveButton("확인", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.dismiss();
                            }
                        });
                dialog.show();

            }
        });

        client = null;
    }

    @Override
    public void onAudioLevel(float audioLevel) {

    }

    @Override
    public void onFinished() {

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
/*                                    intent =new Intent(study.hk.poyowordbook.study.WordStudyActivity.this,WordBookDetailActivity.class);
                                    startActivity(intent);*/

                                    SpeechToText();

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
