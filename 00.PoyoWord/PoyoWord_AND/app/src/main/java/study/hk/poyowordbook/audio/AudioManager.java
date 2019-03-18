package study.hk.poyowordbook.audio;

import android.app.Activity;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;


public class AudioManager {

    private MediaPlayer bgmMp3 = new MediaPlayer();

    private Context _context;
    private Activity _activity;

    private static AudioManager _instance = null;

    public static AudioManager GetInstance()
    {
        return _instance;
    }

    public AudioManager (Context context, Activity activity) {
        _context = context;
        _activity = activity;

        _instance = this;
    }

    public void StopBGM() {
        if (bgmMp3.isPlaying()) {
            bgmMp3.stop();
            bgmMp3.stop();
            bgmMp3.release();
            bgmMp3 = null;
        }
    }

    // - 신인환 주석 : BGM 플레이
    // - for MediaPlay
    public void PlayBGM(String address) {
        try {
            if (bgmMp3 == null) {
                bgmMp3 = new MediaPlayer();
            }

            AssetFileDescriptor descriptor = _activity.getAssets().openFd(address);
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
