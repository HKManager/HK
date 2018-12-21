using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HK.PoyoWordBook
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class page뱀키우기 : ContentPage
    {
        public page뱀키우기()
        {
            InitializeComponent();

            JoystickControl.Move += onMove;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            //this.Animate("", (s) => Layout(new Rectangle(((1 - s) * Width), Y, Width, Height)), 16, 600, Easing.Linear, null, null);
        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();

            //this.Animate("", (s) => Layout(new Rectangle((s * Width) * -1, Y, Width, Height)), 16, 600, Easing.Linear, null, null);
        }

        private void onMove()
        {
            var x = JoystickControl.Xposition;
            var y = JoystickControl.Yposition;

            var dis = JoystickControl.Distance;
            var angle = JoystickControl.Angle;

            if (x <= -10 && angle >= 225 && angle <= 315)
            {
                //hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("37");
            }
            else if (x >= 10 && angle >= 45 && angle <= 135)
            {
                //hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("39");
            }
            else if (y >= 10 && (angle >= 315 || angle <= 45))
            {
                //hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("38");
            }
            else if (y <= -10 && angle >= 135 && angle <= 225)
            {
                //hybridWebView.ShowResult("00");
                hybridWebView.ShowResult("40");
            }
        }
    }
}