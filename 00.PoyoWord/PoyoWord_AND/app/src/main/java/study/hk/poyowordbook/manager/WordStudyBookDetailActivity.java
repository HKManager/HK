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
import Query.Manager_WordAudLoc;
import Query.Manager_WordBook;
import Query.Manager_WordStudyBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.R;

public class WordStudyBookDetailActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;
    private WebView lWebView = null;

    private Manager_WordAudLoc manager_wordAudioLoc;
    private Manager_WordBook manager_wordBook;
    private Manager_WordStudyBook manager;

    private Gson gson = new Gson();

    private Intent intent;
    private String WSB_SN;

    private ObjectMapper mapper = null;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_study_book_detail);

        context = getApplicationContext();
        manager = new Manager_WordStudyBook(context);
        manager_wordBook = new Manager_WordBook(context);
        manager_wordAudioLoc = new Manager_WordAudLoc(context);

        WSB_SN = getIntent().getExtras().getString("WSB_SN");
        mapper = new ObjectMapper();

        lWebView = (WebView)findViewById(R.id.mainView);

        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) { }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {

                // - 1. 단어 오디오배치 조회
                List<Map> wordaudioLocList = manager_wordAudioLoc.Search();
                EventData data = new EventData();
                data.SetHandle("WordAudioLoc");
                data.SetView(HARDCODE.단어학습장상세);
                data.SetValue(wordaudioLocList);
                String JsonEventData = gson.toJson(data);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");

                // - 2. 단어장 콤보박스 조회
                List<Map> wordbookList = manager_wordBook.Search();
                data = new EventData();
                data.SetHandle(HARDCODE.코드리스트);
                data.SetView(HARDCODE.단어학습장상세);
                data.SetValue(wordbookList);
                JsonEventData = gson.toJson(data);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");

                if(!WSB_SN.equals("")) {
                    Map mapData =  manager.Search(WSB_SN);

                    String FromDT = mapData.get("WSB_FROMDT").toString();
                    String ToDT = mapData.get("WSB_TODT").toString();

                    String FromYear = FromDT.substring(0, 4);
                    String FromMonth = FromDT.substring(4, 6);
                    String FromDay = FromDT.substring(6, 8);

                    String ToYear = ToDT.substring(0, 4);
                    String ToMonth = ToDT.substring(4, 6);
                    String ToDay = ToDT.substring(6, 8);

                    String WSB_FROMDT = String.format("%s년 %s월 %s일", FromYear, FromMonth, FromDay);
                    String WSB_TODT = String.format("%s년 %s월 %s일", ToYear, ToMonth, ToDay);

                    mapData.put("WSB_FROMDT", WSB_FROMDT);
                    mapData.put("WSB_TODT", WSB_TODT);

                    data.SetHandle(HARDCODE.상세조회);
                    data.SetView(HARDCODE.단어학습장상세);
                    data.SetValue(mapData);
                    JsonEventData = gson.toJson(data);
                    lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
                }
            }

            public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                return true;
            }
        });

        lWebView.getSettings().setJavaScriptEnabled(true);
        lWebView.addJavascriptInterface(new JavaScriptBridge(), "android");
        //lWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        lWebView.loadUrl("file:///android_asset/Poyo/manager/WordStudyBookDetail.html");
    }

    private class JavaScriptBridge {
        @android.webkit.JavascriptInterface
        public void setData(final String arg) {
            handler.post(new Runnable() {
                public void run() {
                    //Toast.makeText(context, arg, Toast.LENGTH_LONG).show();
                    //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");
                    EventData parse = gson.fromJson(arg, EventData.class);

                    Map<String, Object> map = new HashMap<String, Object>();

                    EventData data = new EventData();
                    String JsonEventData = "";

                    switch (parse.handle) {
                        case HARDCODE.화면호출:
                            switch (parse.data) {
                                case HARDCODE.단어학습장관리:
                                    finish();
                                    break;
                            }
                            break;
                        case HARDCODE.일반조회 :
                            // - 3. 단어장 단어 리스트 조회
                            Map wordBook = manager_wordBook.Search(parse.data);
                            data.SetHandle("WORDLIST");
                            data.SetView(HARDCODE.단어학습장상세);
                            data.SetValue(wordBook);
                            JsonEventData = gson.toJson(data);
                            lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
                            break;
                        case HARDCODE.등록:
                            try {
                                map = mapper.readValue(parse.data, new TypeReference<Map<String, Object>>(){});

                                String FromDT = map.get("WSB_FROMDT").toString();
                                String ToDT = map.get("WSB_TODT").toString();

                                String[] FromDTArray = FromDT.split(" ");
                                String[] ToDTArray = ToDT.split(" ");

                                String From_YEAR = FromDTArray[0].toString().substring(0, 4);
                                String From_Month = FromDTArray[1].toString().substring(0, 2);
                                String From_Day = FromDTArray[2].toString().substring(0, 2);

                                String To_YEAR = ToDTArray[0].toString().substring(0, 4);
                                String To_Month = ToDTArray[1].toString().substring(0, 2);
                                String To_Day = ToDTArray[2].toString().substring(0, 2);

                                String WSB_FROMDT = String.format("%s%s%s", From_YEAR, From_Month, From_Day);
                                String WSB_TODT = String.format("%s%s%s", To_YEAR, To_Month, To_Day);

                                map.put("WSB_FROMDT", WSB_FROMDT);
                                map.put("WSB_TODT", WSB_TODT);
                                map.put("WSB_CNT_UNIT", "0");
                                map.put("WSB_CNT_UNIT_WORD", "0");
                                map.put("WSB_REGISTERDT", "");
                            } catch (JsonGenerationException e) {
                                e.printStackTrace();
                            } catch (JsonMappingException e) {
                                e.printStackTrace();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }

                            if(WSB_SN.equals("")) {
                                manager.Insert(map);

                                List<Map<String, Object>> WordList = (List<Map<String, Object>>) map.get("WORD_LIST");

                                WordList.forEach(t -> {
                                    manager.InsertMapping(WSB_SN, t);
                                    // - 매핑테이블에 단어 등록
                                });
                            } else {
                                map.put("WSB_SN", WSB_SN);
                                manager.Update(map);

                                List<Map<String, Object>> WordList = (List<Map<String, Object>>) map.get("WORD_LIST");
                                List<Map<String, Object>> RemoveList = (List<Map<String, Object>>) map.get("REMOVE_LIST");

                                RemoveList.forEach(t -> {
                                    if(!t.get("MWSW_SN").toString().equals("")) {
                                        manager.DeleteMapping(WSB_SN, t);
                                    }
                                });

                                WordList.forEach(t -> {
                                    if(!t.get("MWSW_SN").toString().equals("")) {
                                        manager.UpdateMapping(WSB_SN, t);
                                    } else {
                                        manager.InsertMapping(WSB_SN, t);
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
