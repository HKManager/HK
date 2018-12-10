﻿using HK.SmartERP.Data;
using HK.SmartERP.LIB.Tools;
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
            var result = 이벤트처리기.이벤트처리(str);

            var 데이터 = JsonTool.Deserialize<이벤트데이터>(result);

            switch(데이터.handle)
            {
                case HARDCODE.이벤트.화면호출:
                    보기_거래처상세관리(데이터.data);
                    break;
                case HARDCODE.이벤트.전체조회:
                    hybridWebView.ShowResult(데이터.data);
                    break;
            }

            //보기_거래처상세관리();

            //hybridWebView.Eval($"logForXamarin({str})");
        }

        void 보기_거래처상세관리(string data)
        {
            Device.BeginInvokeOnMainThread(async () =>
            {
                await Navigation.PushAsync(new page거래처상세관리(data));
            });   
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