using System;
using System.Collections.Generic;
using System.Text;

namespace CustomRenderer
{
    public interface ISpeechToText
    {
        void Start();
        void Stop();
        event EventHandler<EventArgsVoiceRecognition> textChanged;
    }
}
