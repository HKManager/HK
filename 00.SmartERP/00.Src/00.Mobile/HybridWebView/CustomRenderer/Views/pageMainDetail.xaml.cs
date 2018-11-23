using HK.SmartERP.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CustomRenderer.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class pageMainDetail : ContentPage
    {
        public delegate ContentPage GetEditorInstance(string InitialEditorText);
        static public GetEditorInstance EditorFactory;
        static ISpeechToText speechRecognitionInstnace;

        public pageMainDetail()
        {
            InitializeComponent();

            //hybridWebView.RegisterAction(data => ShowData(data));



			androidLayout.IsVisible = true;
			voiceButton.OnTextChanged += (s) => {
				textLabelDroid.Text = s;
			};


//#if __IOS__
//			iOSLayout.IsVisible = true;
//			this.Content = iOSLayout;
//			speechRecognitionInstnace = DependencyService.Get<ISpeechToText> ();
//			speechRecognitionInstnace.textChanged += OnTextChange;
//#endif
        }

        public void OnStart(Object sender, EventArgs args)
        {
            speechRecognitionInstnace.Start();
            //nameButtonStart.IsEnabled = false;
            //nameButtonStop.IsEnabled = true;
        }
        public void OnStop(Object sender, EventArgs args)
        {
            speechRecognitionInstnace.Stop();
            //nameButtonStart.IsEnabled = true;
            //nameButtonStop.IsEnabled = false;

        }
        public void OnTextChange(object sender, EventArgsVoiceRecognition e)
        {
            //textLabeliOS.Text = e.Text;
            //if (e.IsFinal)
            //{
            //    nameButtonStart.IsEnabled = true;
            //}
        }

        //private void ShowData(string str)
        //{
        //    이벤트처리기.이벤트처리(str);

        //    hybridWebView.ShowResult(str);
        //    //hybridWebView.Eval($"logForXamarin({str})");
        //}
    }
}