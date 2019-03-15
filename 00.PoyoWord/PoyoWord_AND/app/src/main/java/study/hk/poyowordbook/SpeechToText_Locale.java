package study.hk.poyowordbook;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;

import com.kakao.sdk.newtoneapi.SpeechRecognizerManager;

import java.util.ArrayList;

public class SpeechToText_Locale {

    private static Intent intentSTT;
    private static SpeechRecognizer mRecognizer = null;

    private Activity activity = null;
    private Context context = null;

    private CustomCallback mCallback;

    private String Text = "";

    public SpeechToText_Locale(Context context, Activity activity, CustomCallback callback) {

        mCallback = callback;

        context = context;
        activity = activity;

        intentSTT = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intentSTT.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, activity.getPackageName());
        //intentSTT.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ko-KR");
        intentSTT.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");


        mRecognizer = SpeechRecognizer.createSpeechRecognizer(context);
        mRecognizer.setRecognitionListener(listener);
    }

    public void SpeechToText() {

        Text = "";
        mRecognizer.startListening(intentSTT);
    }

    private RecognitionListener listener = new RecognitionListener() {
        @Override
        public void onRmsChanged(float rmsdB) {// TODO Auto-generated method stub
        }
        @Override
        public void onResults(Bundle results) {// TODO Auto-generated method stub

            String key = "";key = SpeechRecognizer.RESULTS_RECOGNITION;
            ArrayList<String> mResult = results.getStringArrayList(key);
            String[] rs = new String[mResult.size()];
            mResult.toArray(rs);

            Text += rs[0];
        }@Override
        public void onReadyForSpeech(Bundle params) {// TODO Auto-generated method stub
        }@Override

        public void onPartialResults(Bundle partialResults) {// TODO Auto-generated method stub
        }@Override
        public void onEvent(int eventType, Bundle params) {// TODO Auto-generated method stub
        }@Override
        public void onError(int error) {// TODO Auto-generated method stub
        }@Override
        public void onEndOfSpeech() {// TODO Auto-generated method stub
            mCallback.onCall(Text);

        }@Override
        public void onBufferReceived(byte[] buffer) {// TODO Auto-generated method stub
        }@Override
        public void onBeginningOfSpeech() {// TODO Auto-generated method stub\
        }
    };
}
