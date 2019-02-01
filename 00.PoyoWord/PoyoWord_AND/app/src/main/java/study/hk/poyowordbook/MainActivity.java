package study.hk.poyowordbook;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JsResult;
import android.webkit.WebViewClient;
import android.webkit.WebView;
import android.os.Handler;
import android.widget.Toast;
import android.annotation.SuppressLint;

import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import Event.EventData;
import Query.Manager_Code;
import io.github.controlwear.virtual.joystick.android.JoystickView;
import study.hk.data.Data.*;


public class MainActivity extends AppCompatActivity {

    private final Handler handler = new Handler();
    private Context context = null;

   private WebView lWebView = null;
   private EventData eventData = new EventData();
    Gson gson = new Gson();

    @SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 코드상에서 액티비티 화면에 타이틀을 없애줌. 매니페스트에서도 가능.
        //requestWindowFeature(Window.FEATURE_NO_TITLE);

        context = getApplicationContext();

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


        // - 신인환 주석 : SQLite DB 관련
        // onCreate 에서
        try {
            boolean bResult = isCheckDB(context);	// DB가 있는지?
            Log.d("MiniApp", "DB Check="+bResult);
            if(!bResult){	// DB가 없으면 복사
                copyDB(context);
            }else{
            }
        } catch (Exception e) {
        }

        Manager_Code code = new Manager_Code(context);
        code.Search();
        // - 신인환 주석 : SQLite DB 관련

        eventData.SetHandle("move");
        eventData.SetView("main");



        final JoystickView joystick = (JoystickView) findViewById(R.id.joystickView_right);
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

                if(x <= 40 && (angle >= 135 && angle <= 225)) { // - LEFT
                    eventData.SetData("37");
                } else if(x >= 60 && (angle >= 315 || angle <= 45)) { // - RIGHT
                    eventData.SetData("39");
                } else if(y <= 40 && (angle >= 45 && angle <= 135)) { // - UP
                    eventData.SetData("38");
                }else if(y >= 60 && (angle >= 225 && angle <= 315)) { // - DOWN
                    eventData.SetData("40");
                } else {
                    eventData.SetData("00");
                }

                String JsonEventData = gson.toJson(eventData);
                lWebView.loadUrl("javascript:showData('" + JsonEventData + "')");
            }
        });
    }






    // - 신인환 주석 : SQLite DB 파트
    // DB가 있나 체크하기
    public boolean isCheckDB(Context mContext){
        String filePath = "/data/data/" + getApplicationContext().getPackageName() + "/databases/" + HARDCODE.DataBase;
        File file = new File(filePath);

        if (file.exists()) {
            return true;
        }

        return false;
    }

    // DB를 복사하기
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
    // - 신인환 주석 : SQLite DB 파트


    // - 신인환 주석 : 자바스크립트 연동 파트
    private class JavaScriptBridge {
        @android.webkit.JavascriptInterface
        public void setMessage(final String arg) {
            handler.post(new Runnable() {
                public void run() {
                    Toast.makeText(context, arg, Toast.LENGTH_LONG).show();
                    //lWebView.loadUrl("javascript:setMessage('" + "abc" + "')");
                }
            });
        }
    }
    // - 신인환 주석 : 자바스크립트 연동 파트
}
