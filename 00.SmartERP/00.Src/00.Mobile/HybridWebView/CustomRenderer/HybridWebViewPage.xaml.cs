using Xamarin.Forms;

namespace CustomRenderer
{
	public partial class HybridWebViewPage : ContentPage
	{
		public HybridWebViewPage ()
		{
			InitializeComponent ();

            //hybridWebView.RegisterAction (data => DisplayAlert ("Alert", "Hello " + data, "OK"));

            hybridWebView.RegisterAction(data => ShowData(data));
        }

        private void ShowData(string str)
        {
            hybridWebView.ShowResult(str);
            //hybridWebView.Eval($"logForXamarin({str})");
        }
	}
}
