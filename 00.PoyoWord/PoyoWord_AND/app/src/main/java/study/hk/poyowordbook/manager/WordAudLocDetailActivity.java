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

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import Event.EventData;
import Query.Manager_Code;
import Query.Manager_WordAudLoc;
import Query.Manager_WordBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.MainActivity;
import study.hk.poyowordbook.R;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WordAudLocDetailActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;
    private WebView lWebView = null;
    private Manager_WordAudLoc manager;

    private Gson gson = new Gson();

    private Intent intent;
    private String WAL_SN;

    private ObjectMapper mapper = null;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_aud_loc_detail);

        context = getApplicationContext();
        manager = new Manager_WordAudLoc(context);

        WAL_SN = getIntent().getExtras().getString("WAL_SN");
        mapper = new ObjectMapper();

        lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) { }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {
                List<Map> codeList = Manager_Code.GetInstance().GetList_2nd("003", true);
                EventData data = new EventData();
                data.SetHandle(HARDCODE.코드리스트);
                data.SetView(HARDCODE.단어장배치관리);
                data.SetValue(codeList);
                String JsonEventData = gson.toJson(data);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");

                if(!WAL_SN.equals("")) {
                    Map mapData =  manager.SearchData(WAL_SN);

                    List<Map> locs = null;

                    try {
                        locs = mapper.readValue(mapData.get("WAL_LOCS").toString(), new TypeReference<List<Map>>(){});
                        mapData.put("WAL_LOCS", locs);

                        data.SetHandle(HARDCODE.상세조회);
                        data.SetView(HARDCODE.단어장배치관리);
                        data.SetValue(mapData);
                        JsonEventData = gson.toJson(data);
                        lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
                    }catch (JsonGenerationException e) {
                        e.printStackTrace();
                    } catch (JsonMappingException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
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
                        case HARDCODE.등록 :
                            Map<String, Object> map = new HashMap<String, Object>();
                            try {
                                map = mapper.readValue(parse.data, new TypeReference<Map<String, Object>>(){});
                                List<Map<String, String>> WAL_LOCS_LIST = (List<Map<String, String>>) map.get("WAL_LOCS");
                                String WAL_LOCS_JSON = gson.toJson(WAL_LOCS_LIST);
                                map.put("WAL_LOCS_JSON", WAL_LOCS_JSON);
                                map.put("WAL_UPDATE_DT", "");
                                map.put("WAL_USEYN", "0");
                            }catch (JsonGenerationException e) {
                                e.printStackTrace();
                            } catch (JsonMappingException e) {
                                e.printStackTrace();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }

                            if(WAL_SN.equals("")) {
                                manager.Insert(map);
                            } else {
                                map.put("WAL_SN", WAL_SN);
                                manager.Update(map);
                            }

                            break;
                    }
                }
            });
        }
    }
}
