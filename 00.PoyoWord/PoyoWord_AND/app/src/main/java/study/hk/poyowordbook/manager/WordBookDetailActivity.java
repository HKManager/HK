package study.hk.poyowordbook.manager;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import Event.EventData;
import Query.Manager_Code;
import Query.Manager_WordBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.R;

public class WordBookDetailActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;
    private WebView lWebView = null;

    private Gson gson = new Gson();
    private String WB_SN;
    private ObjectMapper mapper = null;
    private Manager_WordBook manager;
    //private Manager_Word manager;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_book_detail);

        context = getApplicationContext();

        WB_SN = getIntent().getExtras().getString("WB_SN");
        mapper = new ObjectMapper();
        manager = new Manager_WordBook(context);

        lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {

            }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {
                //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");

                EventData data = new EventData();
                List<Map> codeList = Manager_Code.GetInstance().GetList_2nd("100", true);
                data.SetHandle(HARDCODE.코드리스트);
                data.SetView(HARDCODE.단어장상세);
                data.SetValue(codeList);
                String JsonEventData = gson.toJson(data);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");

                if(!WB_SN.equals("")) {
                    Map mapData =  manager.Search(WB_SN);

                    //mapData.put("WAL_LOCS", locs);

                    data.SetHandle(HARDCODE.상세조회);
                    data.SetView(HARDCODE.단어장상세);
                    data.SetValue(mapData);
                    JsonEventData = gson.toJson(data);
                    lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
                }
            }

            public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                //lWebView.loadUrl("javascript:setMessage('" + message + "')");
                //result.confirm();
                return true;
            }
        });
        lWebView.getSettings().setJavaScriptEnabled(true);
        lWebView.addJavascriptInterface(new WordBookDetailActivity.JavaScriptBridge(), "android");
        //lWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        lWebView.loadUrl("file:///android_asset/Poyo/manager/WordBookDetail.html");
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
                                case HARDCODE.단어장관리 :
                                    Intent intent=new Intent(WordBookDetailActivity.this,WordBookActivity.class);
                                    startActivity(intent);
                                    break;
                            }
                            break;
                        case HARDCODE.등록 :
                            Map<String, Object> map = new HashMap<String, Object>();

                            try {
                                map = mapper.readValue(parse.data, new TypeReference<Map<String, Object>>(){});

                                map.put("WB_CNT_UNIT", "0");
                                map.put("WB_CNT_WORD_UNIT", "0");
                                map.put("WB_CNT_WORD", "0");
                                map.put("WAL_SN", "0");
                                map.put("WB_LOOPCNT", "0");
                                map.put("WB_INTERVAL", "0");
                                map.put("WB_DESC", "");
                                map.put("WB_REGISTERDT", "");
                                map.put("WB_USEYN", "0");
                            }catch (JsonGenerationException e) {
                                e.printStackTrace();
                            } catch (JsonMappingException e) {
                                e.printStackTrace();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }

                            if(WB_SN.equals("")) {
                                manager.Insert(map);
                            } else {
                                map.put("WB_SN", WB_SN);
                                manager.Update(map);

                                List<Map<String, Object>> WordList = (List<Map<String, Object>>) map.get("WORD_LIST");

                                WordList.forEach(t -> {
                                    if(t.get("WORD_SN") != null) {

                                    }
                                });
                            }

                            break;
                    }
                }
            });
        }
    }
}
