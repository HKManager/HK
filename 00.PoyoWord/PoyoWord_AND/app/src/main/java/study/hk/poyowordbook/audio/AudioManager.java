package study.hk.poyowordbook.audio;

import android.app.Activity;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;


public class AudioManager {

    private MediaPlayer bgmMp3 = new MediaPlayer();

    private Context context;
    private Activity activity;

    private static AudioManager _instance = null;

    public static AudioManager GetInstance()
    {
        return _instance;
    }

    public AudioManager (Context context, Activity activity) {
        context = context;
        activity = activity;
    }

    public void StopBGM() {
        bgmMp3.stop();
    }

    // - 신인환 주석 : BGM 플레이
    // - for MediaPlay
    public void PlayBGM(String address) {
        try {
            if (bgmMp3.isPlaying()) {
                bgmMp3.stop();
                bgmMp3.release();
                bgmMp3 = new MediaPlayer();
            }

            AssetFileDescriptor descriptor = activity.getAssets().openFd(address);
            bgmMp3.setDataSource(descriptor.getFileDescriptor(), descriptor.getStartOffset(), descriptor.getLength());
            descriptor.close();

            bgmMp3.prepare();
            bgmMp3.setVolume(1f, 1f);
            bgmMp3.setLooping(true);
            bgmMp3.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    // - for MediaPlay
    // - 신인환 주석 : BGM 플레이

}
