using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace CustomRenderer
{
    public class VoiceButton : Button
    {
        public Action<string> OnTextChanged { get; set; }
    }
}
