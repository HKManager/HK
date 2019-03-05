package study.hk.poyowordbook.manager;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Handler;
import android.support.design.widget.TabLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import android.webkit.JsResult;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import Event.EventData;
import Query.Manager_WordAudLoc;
import Query.Manager_WordBook;
import study.hk.data.Data.HARDCODE;
import study.hk.poyowordbook.MainActivity;
import study.hk.poyowordbook.R;

public class WordManagerActivity extends AppCompatActivity {

    private final static Handler handler = new Handler();
    private static Context context = null;
    private static WebView webViewWordBook = null;
    private static WebView webViewWordStudyBook = null;
    private static WebView webViewWordAudBook = null;
    private static Manager_WordBook wordBook;
    private static Manager_WordAudLoc wordAudBook;
    private static Gson gson = new Gson();
    private static Intent intent;

    private SectionsPagerAdapter mSectionsPagerAdapter;

    private ViewPager mViewPager;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_manager);

        context = getApplicationContext();
        wordBook = new Manager_WordBook(context);
        wordAudBook = new Manager_WordAudLoc(context);

        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);

        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(mViewPager));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                intent = new Intent(context,MainActivity.class);
                startActivity(intent);

                //Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        //.setAction("Action", null).show();
            }
        });

        //mViewPager.setCurrentItem(2);
        //mViewPager.setCurrentItem(0);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_word_manager, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public static class PlaceholderFragment extends Fragment {

        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }

        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {

            View rootView = inflater.inflate(R.layout.fragment_word_manager, container, false);

            int pageNum = getArguments().getInt(ARG_SECTION_NUMBER);
            webViewWordBook = (WebView)rootView.findViewById(R.id.WordBook);
            webViewWordBook.getSettings().setJavaScriptEnabled(true);
            webViewWordBook.addJavascriptInterface(new JavaScriptBridge(), "android");
            webViewWordStudyBook = (WebView)rootView.findViewById(R.id.WordStudyBook);
            webViewWordStudyBook.getSettings().setJavaScriptEnabled(true);
            webViewWordStudyBook.addJavascriptInterface(new JavaScriptBridge(), "android");
            webViewWordAudBook = (WebView)rootView.findViewById(R.id.WordAudLoc);
            webViewWordAudBook.getSettings().setJavaScriptEnabled(true);
            webViewWordAudBook.addJavascriptInterface(new JavaScriptBridge(), "android");

            switch (pageNum) {
                case 0:
                    webViewWordBook.setWebViewClient(new WebViewClient() {
                        @Override
                        public void onPageStarted(WebView view, String url, Bitmap favicon) { }

                        @Override
                        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
                        public void onPageFinished(WebView view, String url) {
                            EventData data = new EventData();

                            ArrayList<Map> list = wordBook.Search();
                            String jsonResult = gson.toJson(list);
                            data.SetHandle(HARDCODE.전체조회);
                            data.SetView(HARDCODE.단어장관리);
                            data.SetValue(list);

                            String JsonEventData = gson.toJson(data);

                            webViewWordBook.loadUrl("javascript:showData('" + JsonEventData + "')");
                        }

                        public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                            return true;
                        }
                    });

                    webViewWordBook.setVisibility(View.VISIBLE);
                    webViewWordStudyBook.setVisibility(View.GONE);
                    webViewWordAudBook.setVisibility(View.GONE);
                    break;
                case 1:
                    webViewWordStudyBook.setWebViewClient(new WebViewClient() {
                        @Override
                        public void onPageStarted(WebView view, String url, Bitmap favicon) { }

                        @Override
                        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
                        public void onPageFinished(WebView view, String url) {
                        }

                        public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                            return true;
                        }
                    });

                    webViewWordBook.setVisibility(View.GONE);
                    webViewWordStudyBook.setVisibility(View.VISIBLE);
                    webViewWordAudBook.setVisibility(View.GONE);
                    break;
                case 2:
                    webViewWordAudBook.setWebViewClient(new WebViewClient() {
                        @Override
                        public void onPageStarted(WebView view, String url, Bitmap favicon) { }

                        @Override
                        @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
                        public void onPageFinished(WebView view, String url) {

                            List<Map> list = wordAudBook.Search();

                            EventData data = new EventData();

                            data.SetHandle(HARDCODE.전체조회);
                            data.SetView(HARDCODE.단어장관리);
                            data.SetValue(list);

                            String JsonEventData = gson.toJson(data);

                            webViewWordAudBook.loadUrl("javascript:showData('" + JsonEventData + "')");

                        }

                        public boolean onJsAlert(final WebView view, final String url, final String message, JsResult result) {
                            return true;
                        }
                    });
                    webViewWordBook.setVisibility(View.GONE);
                    webViewWordStudyBook.setVisibility(View.GONE);
                    webViewWordAudBook.setVisibility(View.VISIBLE);
                    break;
            }

            webViewWordBook.loadUrl("file:///android_asset/Poyo/manager/WordBookList.html");
            webViewWordStudyBook.loadUrl("file:///android_asset/Poyo/manager/WordStudyBookList.html");
            webViewWordAudBook.loadUrl("file:///android_asset/Poyo/manager/WordAudLocList.html");
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

                    switch (parse.handle) {
                        case HARDCODE.화면호출 :
                            switch (parse.data) {
                                case HARDCODE.단어장상세 :
                                    intent = new Intent(context,WordBookDetailActivity.class);
                                    intent.putExtra("WB_SN",""); /*송신*/
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.단어장배치상세 :
                                    intent = new Intent(context,WordAudLocDetailActivity.class);
                                    intent.putExtra("WAL_SN",""); /*송신*/
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.메인화면 :
                                    intent =new Intent(context,MainActivity.class);
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.단어장배치관리 :
                                    intent =new Intent(context,WordAudLocActivity.class);
                                    context.startActivity(intent);
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

                            webViewWordBook.loadUrl("javascript:showData('" + JsonEventData + "')");
                            break;
                        case HARDCODE.수정 :
                            switch (parse.view) {
                                case HARDCODE.단어장관리:
                                    intent = new Intent(context,WordBookDetailActivity.class);
                                    intent.putExtra("WB_SN",parse.data); /*송신*/
                                    context.startActivity(intent);
                                    break;
                                case HARDCODE.단어학습장관리:
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
            // getItem is called to instantiate the fragment for the given page.
            // Return a PlaceholderFragment (defined as a static inner class below).
            return PlaceholderFragment.newInstance(position);
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return 3;
        }
    }
}
