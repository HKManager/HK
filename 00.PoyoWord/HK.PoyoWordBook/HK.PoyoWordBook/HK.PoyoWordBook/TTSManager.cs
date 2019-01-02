using Plugin.TextToSpeech;
using Plugin.TextToSpeech.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.PoyoWordBook
{
    public class TTSManager
    {
        private static TTSManager _instance;

        public static TTSManager GetInstance()
        {
            if (_instance == null)
                _instance = new TTSManager();

            return _instance;
        }

        private static CrossLocale? locale = null;

        public async void TellVoice(bool isDefault, string strLocale, string text)
        {
            var locales = await CrossTextToSpeech.Current.GetInstalledLanguages();
            locale = locales.FirstOrDefault(l => l.ToString() == strLocale);

            await CrossTextToSpeech.Current.Speak(text,
                pitch: (float)1.0,
                speakRate: (float)1.0,
                volume: (float)1.0,
                crossLocale: locale);
        }
    }
}
