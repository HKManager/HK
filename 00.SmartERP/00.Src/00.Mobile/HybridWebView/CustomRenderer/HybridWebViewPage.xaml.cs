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

            JoystickControl.Move += onMove;
        }


        protected override void OnSizeAllocated(double width, double height)
        {
            base.OnSizeAllocated(width, height); //must be called
            if (this.Width != width || this.Height != height)
            {
                //reconfigure layout
            }
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

        private void onMove()
        {
            var x = JoystickControl.Xposition;
            var y = JoystickControl.Yposition;

            var dis = JoystickControl.Distance;
            var angle = JoystickControl.Angle;

            if (x <= -10 && angle >= 225 && angle <= 315)
            {
                hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("37");
            }
            else if (x >= 10 && angle >= 45 && angle <= 135)
            {
                hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("39");
            }
            else if (y >= 10 && (angle >= 315 || angle <= 45) )
            {
                hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("38");
            }
            else if (y <= -10 && angle >= 135 && angle <= 225)
            {
                hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("40");
            }
            else
            {
                hybridWebView.ShowResult("00");
            }
        }
    }
}
