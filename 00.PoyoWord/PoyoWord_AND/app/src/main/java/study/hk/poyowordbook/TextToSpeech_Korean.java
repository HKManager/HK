package study.hk.poyowordbook;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.kakao.sdk.newtoneapi.SpeechRecognizerManager;
import com.kakao.sdk.newtoneapi.TextToSpeechClient;
import com.kakao.sdk.newtoneapi.TextToSpeechListener;
import com.kakao.sdk.newtoneapi.TextToSpeechManager;

public class TextToSpeech_Korean implements TextToSpeechListener{

    private static final String TAG = "TextToSpeech_Korean";

    private TextToSpeechClient ttsClient;
    private CustomCallback mCallback;

    public TextToSpeech_Korean(Context context, Activity activity, CustomCallback callback) {

        mCallback = callback;

        context = context;
        activity = activity;
        TextToSpeechManager.getInstance().initializeLibrary(context);


    }

    public void TextToSpeech(String strText, float speed) {

        ttsClient = new TextToSpeechClient.Builder()
                .setSpeechMode(TextToSpeechClient.NEWTONE_TALK_2)
                .setSpeechSpeed(speed)
                .setSpeechVoice(TextToSpeechClient.VOICE_WOMAN_READ_CALM)
                .setListener(this)
                .build();

        ttsClient.play(strText);
    }

    @Override
    public void onFinished() {

        int intSentSize = ttsClient.getSentDataSize();
        int intRecvSize = ttsClient.getReceivedDataSize();

        final String strInacctiveText = "onFinished() SentSize : " + intSentSize + " RecvSize : " + intRecvSize;

        Log.i(TAG, strInacctiveText);

        ttsClient = null;

        mCallback.onCall("");
    }

    @Override
    public void onError(int code, String message) {
        ttsClient = null;
    }
}
