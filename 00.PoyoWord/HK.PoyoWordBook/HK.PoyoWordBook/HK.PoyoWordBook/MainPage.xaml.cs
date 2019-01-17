using HK.PoyoWordBook.Data;
using HK.SmartERP.LIB.Tools;
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

            hybridWebView.RegisterAction(data => ShowData(data));
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

        private void ShowData(string str)
        {
            var data = JsonTool.Deserialize<이벤트데이터>(str);

            switch (data.handle)
            {
                case HARDCODE.이벤트.화면호출:
                    switch (data.data)
                    {
                        case "snake":
                            Application.Current.MainPage = new page뱀키우기();
                            break;
                        case "flybird":
                            //Application.Current.MainPage = new page멀리날기();
                            break;
                    }
                    break;
            }

            

            //App.PageView = ;

            //hybridWebView.ShowResult(str);
        }
    }
}
