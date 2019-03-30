package study.hk.poyowordbook;

import android.content.Context;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebViewClient;
import android.webkit.WebView;
import android.os.Handler;
import android.annotation.SuppressLint;

import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import Event.EventData;
import Query.Manager_Code;
import Query.Manager_TodayWord;
import io.github.controlwear.virtual.joystick.android.JoystickView;
import study.hk.data.Data.*;
import study.hk.poyowordbook.audio.AudioManager;
import study.hk.poyowordbook.game.FruitKnightActivity;
import study.hk.poyowordbook.manager.WordManagerActivity;
import study.hk.poyowordbook.study.StudyActivity;


public class MainActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;

   private WebView lWebView = null;
   private EventData eventData = new EventData();
    private Gson gson = new Gson();
    private String move = "";

    private AudioManager audioManager = null;

    private JoystickView joystick = null;

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        context = getApplicationContext();

        audioManager = new AudioManager(context, this);
        AudioManager.GetInstance().PlayBGM("Poyo/main/bgm/bgm_1.mp3");

        lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {

            }

            @Override
            @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
            public void onPageFinished(WebView view, String url) {
                //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");
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
        //lWebView.loadUrl("file:///android_asset/Poyo/game/BattleMonster/index.html");
        //lWebView.loadUrl("file:///android_asset/Poyo/main/index.html");
        //lWebView.loadUrl("file:///android_asset/Poyo/Content/index.html");
        lWebView.loadUrl("file:///android_asset/Poyo/main/park/index.html");
        //lWebView.loadUrl("file:///android_asset/Poyo/game/Snake/snake.html");


        // - 신인환 주석 : SQLite DB 관련
        // - for SQLite DB
        // onCreate 에서
        try {
            boolean bResult = isCheckDB(context);	// DB가 있는지?
            Log.d("MiniApp", "DB Check="+bResult);
            if(!bResult){	// DB가 없으면 복사
                copyDB(context);
            }else{
                copyDB(context);
            }
        } catch (Exception e) {
        }

        Manager_Code code = new Manager_Code(context);
        Manager_Code.GetInstance().Load();
        // - for SQLite DB
        // - 신인환 주석 : SQLite DB 관련

        // - 신인환 주석 : 조이스틱 관련
        // - for JoyStick
        eventData.SetHandle("move");
        eventData.SetView("main");


        Manager_TodayWord todayWord = new Manager_TodayWord(context);
        /*Map<String, Object> mapCount =  Manager_TodayWord.GetInstance().GetTodayCount();*/

        Manager_TodayWord.GetInstance().Load();

        if(Manager_TodayWord.GetInstance().wordList.size() <= 0) {
            Manager_TodayWord.GetInstance().Insert();
            Manager_TodayWord.GetInstance().Load();
        }

        joystick = (JoystickView) findViewById(R.id.joystickView_right);
        joystick.setOnMoveListener(new JoystickView.OnMoveListener() {
            @SuppressLint({"DefaultLocale", "SetJavaScriptEnabled", "JavascriptInterface"})
            @Override
            public void onMove(int angle, int strength) {
                //mTextViewAngleRight.setText(angle + "°");
                //mTextViewStrengthRight.setText(strength + "%");
                //mTextViewCoordinateRight.setText(
                //        String.format("x%03d:y%03d",
                //                joystickRight.getNormalizedX(),
                //                joystickRight.getNormalizedY())
                //);

                int x = joystick.getNormalizedX();
                int y = joystick.getNormalizedY();

                if(x <= 45 && (angle >= 135 && angle <= 225)) { // - LEFT
                    move = "37";
                } else if(x >= 55 && (angle >= 315 || angle <= 45)) { // - RIGHT
                    move = "39";
                } else if(y <= 45 && (angle >= 45 && angle <= 135)) { // - UP
                    move = "38";
                }else if(y >= 55 && (angle >= 225 && angle <= 315)) { // - DOWN
                    move = "40";
                } else {
                    move="00";
                    eventData.SetData("00");
                }

                eventData.SetData("00");
                String JsonEventData = gson.toJson(eventData);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");

                eventData.SetData(move);
                JsonEventData = gson.toJson(eventData);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
            }
        });
        // - for JoyStick
        // - 신인환 주석 : 조이스틱 관련
    }






    // - 신인환 주석 : SQLite DB 파트
    // DB가 있나 체크하기
    // - for SQLite Check DB
    public boolean isCheckDB(Context mContext){
        String filePath = "/data/data/" + getApplicationContext().getPackageName() + "/databases/" + HARDCODE.DataBase;
        File file = new File(filePath);

        if (file.exists()) {
            return true;
        }

        return false;
    }

    // DB를 복사하기
    // - for SQLite Copy DB
    // assets의 /db/xxxx.db 파일을 설치된 프로그램의 내부 DB공간으로 복사하기
    public void copyDB(Context mContext){
        Log.d("MiniApp", "copyDB");
        AssetManager manager = mContext.getAssets();
        String folderPath = "/data/data/" + getApplicationContext().getPackageName() + "/databases";
        String filePath = "/data/data/" + getApplicationContext().getPackageName() + "/databases/" + HARDCODE.DataBase;
        File folder = new File(folderPath);
        File file = new File(filePath);

        FileOutputStream fos = null;
        BufferedOutputStream bos = null;
        try {
            InputStream is = manager.open("db/" + HARDCODE.DataBase);
            BufferedInputStream bis = new BufferedInputStream(is);

            if (folder.exists()) {
            }else{
                folder.mkdirs();
            }

            if (file.exists()) {
                file.delete();
                file.createNewFile();
            }

            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            int read = -1;
            byte[] buffer = new byte[1024];
            while ((read = bis.read(buffer, 0, 1024)) != -1) {
                bos.write(buffer, 0, read);
            }

            bos.flush();
            bos.close();
            fos.close();
            bis.close();
            is.close();

        } catch (IOException e) {
            Log.e("ErrorMessage : ", e.getMessage());
        }
    }
    // -  for SQLite DB
    // - 신인환 주석 : SQLite DB 파트


    // - 신인환 주석 : 자바스크립트 연동 파트
    // - for JavaScript Receive Message from JavaScript
    private class JavaScriptBridge {
        @android.webkit.JavascriptInterface
        public void setData(final String arg) {
            handler.post(new Runnable() {
                public void run() {
                    //Toast.makeText(context, arg, Toast.LENGTH_LONG).show();
                    //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");

                    EventData parse = gson.fromJson(arg, EventData.class);

                    switch (parse.handle) {
                        case "joystic" :
                            //Boolean boolean1 = Boolean.valueOf("true");
                            boolean isVisible = Boolean.parseBoolean(parse.data);
                            if(isVisible) {
                                joystick.setVisibility(View.VISIBLE);
                            } else {
                                joystick.setVisibility(View.GONE);
                            }
                            break;
                        case HARDCODE.화면호출 :
                            switch (parse.data) {
                                case HARDCODE.단어장관리 :
                                    Intent intent=new Intent(MainActivity.this,WordManagerActivity.class);
                                    startActivity(intent);
                                    break;
                                case HARDCODE.단어학습카드 :
                                    AudioManager.GetInstance().StopBGM();
                                    intent=new Intent(MainActivity.this,StudyActivity.class);
                                    startActivity(intent);
                                    break;
                                case "INFO" :
                                    AudioManager.GetInstance().StopBGM();
                                    intent=new Intent(MainActivity.this, FruitKnightActivity.class);
                                    startActivity(intent);
                                    break;
                            }
                            break;
                    }
                }
            });
        }
    }
    // - for JavaScript Receive Message from JavaScript
    // - 신인환 주석 : 자바스크립트 연동 파트
}
