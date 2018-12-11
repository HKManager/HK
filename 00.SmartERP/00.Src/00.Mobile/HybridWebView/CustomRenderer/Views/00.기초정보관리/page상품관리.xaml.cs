using HK.SmartERP.Data;
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
	public partial class page상품관리 : ContentPage
	{
		public page상품관리 ()
		{
			InitializeComponent ();

            hybridWebView.RegisterAction(data => ShowData(data));

            hybridWebView.BatchBegin();

            hybridWebView.OnLoadPage += onLoadPage;
        }

        private void ShowData(string str)
        {
            var result = 이벤트처리기.이벤트처리(str);

            var 데이터 = JsonTool.Deserialize<이벤트데이터>(result);

            switch (데이터.handle)
            {
                case HARDCODE.이벤트.화면호출:
                    보기_상세관리(데이터.data);
                    break;
                case HARDCODE.이벤트.전체조회:
                    hybridWebView.ShowResult(데이터.data);
                    break;
            }
        }

        void 보기_상세관리(string data)
        {
            Device.BeginInvokeOnMainThread(async () =>
            {
                await Navigation.PushAsync(new page상품상세관리(data));
            });
        }

        private void onLoadPage()
        {
            이벤트데이터 데이터 = new 이벤트데이터();

            데이터.view = HARDCODE.화면.상품;
            데이터.handle = HARDCODE.이벤트.전체조회;
            데이터.data = string.Empty;

            var data = JsonTool.Serialize(데이터);

            ShowData(data);
        }
    }
}