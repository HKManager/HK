using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace HK.PoyoWordBook
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();

            hybridWebView.RegisterAction(data => DisplayAlert("Alert", "Hello " + data, "OK"));
        }
    }
}
