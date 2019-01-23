package hk.poyowordbook;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView lWebView = (WebView)findViewById(R.id.mainView);
        lWebView.loadUrl("file:///android_asset/Poyo/game/AirShooter/index.html");
    }
}
