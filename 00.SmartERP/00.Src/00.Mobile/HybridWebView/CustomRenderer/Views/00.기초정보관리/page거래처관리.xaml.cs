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
	public partial class page거래처관리 : ContentPage
	{
		public page거래처관리 ()
		{
			InitializeComponent ();

            hybridWebView.RegisterAction(data => ShowData(data));

            hybridWebView.BatchBegin();
        }

        private void ShowData(string str)
        {
            이벤트처리기.이벤트처리(str);

            hybridWebView.ShowResult(str);
            //hybridWebView.Eval($"logForXamarin({str})");
        }

        //protected override void OnAppearing()
        //{
        //    InitializeComponent();

        //    base.OnAppearing();

            

        //    //hybridWebView.Uri = "info/accountManager.html";

        //    //hybridWebView.LoadPage(hybridWebView);
        //}
    }
}