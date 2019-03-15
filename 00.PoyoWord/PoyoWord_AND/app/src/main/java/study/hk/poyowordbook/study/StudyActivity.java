package study.hk.poyowordbook.study;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Handler;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.support.design.widget.TabLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import android.webkit.JsResult;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.google.gson.Gson;

import java.util.List;
import java.util.Map;

import Event.EventData;
import Query.Manager_WordAudLoc;
import Query.Manager_WordBook;
import Query.Manager_WordStudyBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.CustomCallback;
import study.hk.poyowordbook.R;
import study.hk.poyowordbook.SpeechToText;
import study.hk.poyowordbook.SpeechToText_Locale;
import study.hk.poyowordbook.TextToSpeech_Korean;
import study.hk.poyowordbook.TextToSpeech_Locale;
import study.hk.poyowordbook.manager.WordAudLocDetailActivity;
import study.hk.poyowordbook.manager.WordBookDetailActivity;
import study.hk.poyowordbook.manager.WordStudyBookDetailActivity;

public class StudyActivity extends AppCompatActivity{

    private final static Handler handler = new Handler();
    private static Context context = null;
    private static WebView webViewWordBook = null;
    private static WebView webViewWordStudyBook = null;
    private static WebView webViewWordAudBook = null;

    private static Manager_WordBook wordBook;
    private static Manager_WordAudLoc wordAudBook;
    private static Manager_WordStudyBook wordStudyBook;

    private static Gson gson = new Gson();
    private static Intent intent;

    private SectionsPagerAdapter mSectionsPagerAdapter;

    private ViewPager mViewPager;

    private static SpeechToText stt;
    private static SpeechToText_Locale stt_local;
    private static TextToSpeech_Locale tts_local;
    private static TextToSpeech_Korean tts_korean;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_study);

        context = getApplicationContext();
        wordStudyBook = new Manager_WordStudyBook(context);

        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);

        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(mViewPager));

        stt = new SpeechToText(context, this, new CustomCallback() {

            @Override
            public void onCall(String s) {
                // 여기에서 콜백으로 넘어온 데이터 핸들링을 하게 됩니다. interface에서는 String을 넘겨주니깐 이 친구가 넘어오겠지요.
                int abc = 0;
            }
        });

        tts_local = new TextToSpeech_Locale(context, this, new CustomCallback() {

            @Override
            public void onCall(String s) {
                // 여기에서 콜백으로 넘어온 데이터 핸들링을 하게 됩니다. interface에서는 String을 넘겨주니깐 이 친구가 넘어오겠지요.
                int abc = 0;
            }
        });

        tts_korean = new TextToSpeech_Korean(context, this, new CustomCallback() {

            @Override
            public void onCall(String s) {
                // 여기에서 콜백으로 넘어온 데이터 핸들링을 하게 됩니다. interface에서는 String을 넘겨주니깐 이 친구가 넘어오겠지요.
                int abc = 0;
            }
        });

        stt_local = new SpeechToText_Locale(context, this, new CustomCallback() {

            @Override
            public void onCall(String s) {
                // 여기에서 콜백으로 넘어온 데이터 핸들링을 하게 됩니다. interface에서는 String을 넘겨주니깐 이 친구가 넘어오겠지요.
                int abc = 0;
            }
        });

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        tts_local.Close();
        stt.Release();
    }

    private static void SpeechToText() {
        stt_local.SpeechToText();
    }

    private static void TextToSpeech() {
        /*tts_local.TextToSpeech("a,p,p,l,e");*/

        tts_korean.TextToSpeech("a,p,p,l,e");
    }

    public static class StudyFragment extends Fragment {

        private static final String ARG_SECTION_NUMBER = "section_number";

        public StudyFragment() {
        }

        public static StudyFragment newInstance(int sectionNumber) {
            StudyFragment fragment = new StudyFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {

            View rootView = inflater.inflate(R.layout.fragment_word_book, container, false);

            webViewWordBook = (WebView)rootView.findViewById(R.id.WordBook);
            webViewWordBook.getSettings().setJavaScriptEnabled(true);
            webViewWordBook.addJavascriptInterface(new JavaScriptBridge(), "android");

            webViewWordBook.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) { }

                @Override
                @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
                public void onPageFinished(WebView view, String url) {
/*                    EventData data = new EventData();

                    ArrayList<Map> list = wordBook.Search();
                    String jsonResult = gson.toJson(list);
                    data.SetHandle(HARDCODE.전체조회);
                    data.SetView(HARDCODE.단어장관리);
                    data.SetValue(list);

                    String JsonEventData = gson.toJson(data);

                    webViewWordBook.loadUrl("javascript:showData('" + JsonEventData + "')");*/
                }

                public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                    return true;
                }
            });

            webViewWordBook.loadUrl("file:///android_asset/Poyo/study/WordStudyRoom.html");

            return rootView;
        }
    }

    public static class QuizFragment extends Fragment {

        private static final String ARG_SECTION_NUMBER = "section_number";

        public QuizFragment() {
        }

        public static QuizFragment newInstance(int sectionNumber) {
            QuizFragment fragment = new QuizFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {

            View rootView = inflater.inflate(R.layout.fragment_word_study_book, container, false);

            webViewWordStudyBook = (WebView)rootView.findViewById(R.id.WordStudyBook);
            webViewWordStudyBook.getSettings().setJavaScriptEnabled(true);
            webViewWordStudyBook.addJavascriptInterface(new JavaScriptBridge(), "android");

            webViewWordStudyBook.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) { }

                @Override
                @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
                public void onPageFinished(WebView view, String url) {

                    /*List<Map> list = wordStudyBook.Search();

                    EventData data = new EventData();

                    data.SetHandle(HARDCODE.전체조회);
                    data.SetView(HARDCODE.단어학습장관리);
                    data.SetValue(list);

                    String JsonEventData = gson.toJson(data);

                    webViewWordStudyBook.loadUrl("javascript:showData('" + JsonEventData + "')");*/
                }

                public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                    return true;
                }
            });

            webViewWordStudyBook.loadUrl("file:///android_asset/Poyo/study/WordQuizRoom.html");

            return rootView;
        }
    }

    public static class TestFragment extends Fragment {

        private static final String ARG_SECTION_NUMBER = "section_number";

        public TestFragment() {
        }

        public static TestFragment newInstance(int sectionNumber) {
            TestFragment fragment = new TestFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {

            View rootView = inflater.inflate(R.layout.fragment_word_aud_loc, container, false);

            webViewWordAudBook = (WebView)rootView.findViewById(R.id.WordAudLoc);
            webViewWordAudBook.getSettings().setJavaScriptEnabled(true);
            webViewWordAudBook.addJavascriptInterface(new JavaScriptBridge(), "android");

            webViewWordAudBook.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) { }

                @Override
                @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
                public void onPageFinished(WebView view, String url) {
                    /*List<Map> list = wordAudBook.Search();

                    EventData data = new EventData();

                    data.SetHandle(HARDCODE.전체조회);
                    data.SetView(HARDCODE.단어장배치관리);
                    data.SetValue(list);

                    String JsonEventData = gson.toJson(data);

                    webViewWordAudBook.loadUrl("javascript:showData('" + JsonEventData + "')");*/
                }

                public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                    return true;
                }
            });

            webViewWordAudBook.loadUrl("file:///android_asset/Poyo/study/WordQuizRoom.html");

            return rootView;
        }
    }

    private static class JavaScriptBridge {
        @android.webkit.JavascriptInterface
        public void setData(final String arg) {
            handler.post(new Runnable() {
                public void run() {
                    //Toast.makeText(context, arg, Toast.LENGTH_LONG).show();
                    //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");

                    EventData parse = gson.fromJson(arg, EventData.class);
                    List<Map> list = null;
                    String jsonResult = "";
                    EventData data = null;
                    String JsonEventData = "";

                    switch (parse.handle) {
                        case HARDCODE.화면호출 :
                            switch (parse.data) {
                                case HARDCODE.단어장상세 :
/*                                    intent = new Intent(context,WordBookDetailActivity.class);
                                    intent.putExtra("WB_SN",""); *//*송신*//*
                                    context.startActivity(intent);*/

                                    //SpeechToText();
                                    SpeechToText();
                                    break;
                                case HARDCODE.단어장배치상세 :
                                    intent = new Intent(context,WordAudLocDetailActivity.class);
                                    intent.putExtra("WAL_SN",""); /*송신*/
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.단어학습장상세 :
                                    intent = new Intent(context,WordStudyBookDetailActivity.class);
                                    intent.putExtra("WSB_SN",""); /*송신*/
                                    context.startActivity(intent);
                                    break;
                            }
                            break;
                        case HARDCODE.전체조회 :
                            switch (parse.view) {
                                case HARDCODE.단어장관리 :
                                    list = wordBook.Search();
                                    jsonResult = gson.toJson(list);

                                    data = new EventData();

                                    data.SetHandle(HARDCODE.전체조회);
                                    data.SetView(HARDCODE.단어장관리);
                                    data.SetValue(list);

                                    JsonEventData = gson.toJson(data);

                                    webViewWordBook.loadUrl("javascript:showData('" + JsonEventData + "')");
                                    break;
                                case HARDCODE.단어장배치관리 :
                                    list = wordAudBook.Search();
                                    jsonResult = gson.toJson(list);

                                    data = new EventData();

                                    data.SetHandle(HARDCODE.전체조회);
                                    data.SetView(HARDCODE.단어장배치관리);
                                    data.SetValue(list);

                                    JsonEventData = gson.toJson(data);

                                    webViewWordAudBook.loadUrl("javascript:showData('" + JsonEventData + "')");
                                    break;
                                case  HARDCODE.단어학습장관리 :
                                    list = wordStudyBook.Search();
                                    jsonResult = gson.toJson(list);

                                    data = new EventData();

                                    data.SetHandle(HARDCODE.전체조회);
                                    data.SetView(HARDCODE.단어학습장관리);
                                    data.SetValue(list);

                                    JsonEventData = gson.toJson(data);

                                    webViewWordStudyBook.loadUrl("javascript:showData('" + JsonEventData + "')");
                                    break;
                            }
                            break;
                        case HARDCODE.수정 :
                            switch (parse.view) {
                                case HARDCODE.단어장관리:
                                    intent = new Intent(context,WordBookDetailActivity.class);
                                    intent.putExtra("WB_SN",parse.data); /*송신*/
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.단어학습장관리:
                                    intent = new Intent(context,WordStudyBookDetailActivity.class);
                                    intent.putExtra("WSB_SN",parse.data); /*송신*/
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.단어장배치관리:
                                    intent = new Intent(context,WordAudLocDetailActivity.class);
                                    intent.putExtra("WAL_SN",parse.data); /*송신*/
                                    context.startActivity(intent);
                                    break;
                            }
                            break;
                    }
                }
            });
        }
    }


    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            switch (position){
                case 0:
                    StudyFragment mainTabFragment1 = new StudyFragment();
                    return mainTabFragment1;
                case 1:
                    QuizFragment mainTabFragment2 = new QuizFragment();
                    return mainTabFragment2;
                case 2:
                    TestFragment mainTabFragment3 = new TestFragment();
                    return mainTabFragment3;

                default:
                    return null;
            }
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return 3;
        }
    }
}
