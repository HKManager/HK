package study.hk.poyowordbook;

import android.app.Activity;
import android.content.Context;
import android.media.AudioManager;
import android.speech.tts.TextToSpeech;

import java.util.HashMap;
import java.util.Locale;

public class TextToSpeech_Locale  implements TextToSpeech.OnUtteranceCompletedListener {
    private TextToSpeech tts;              // TTS 변수 선언

    public TextToSpeech_Locale(Context context, Activity activity) {
        // TTS를 생성하고 OnInitListener로 초기화 한다.
        tts = new TextToSpeech(context, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status == TextToSpeech.SUCCESS) {
                    // 언어를 선택한다.
                    tts.setLanguage(Locale.KOREAN);
                }
            }
        });
        tts.setOnUtteranceCompletedListener(this);
    }

    public void TextToSpeech(String text) {
        tts.setPitch(1.0f);         // 음성 톤을 2.0배 올려준다.
        tts.setSpeechRate(0.7f);    // 읽는 속도는 기본 설정
        // editText에 있는 문장을 읽는다.

        HashMap<String, String> ttsAlarm = new HashMap<String, String >();
        ttsAlarm.put(TextToSpeech.Engine.KEY_PARAM_STREAM, String.valueOf(AudioManager.STREAM_MUSIC));
        ttsAlarm.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "TTSEND");
        tts.speak(text,TextToSpeech.QUEUE_FLUSH, ttsAlarm);
    }

    public void Close() {
        // TTS 객체가 남아있다면 실행을 중지하고 메모리에서 제거한다.
        if(tts != null){
            tts.stop();
            tts.shutdown();
            tts = null;
        }
    }

    @Override
    public void onUtteranceCompleted(String utteranceId) {
        if(utteranceId.equals("TTSEND")) {

        }
    }
}
