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

        private void Button_Pressed(object sender, System.EventArgs e)
        {
            hybridWebView.ShowResult("39");
        }

        private void Button_Released(object sender, System.EventArgs e)
        {
            hybridWebView.ShowResult("40");
        }
    }
}
