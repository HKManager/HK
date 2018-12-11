using HK.SmartERP.Data;
using HK.SmartERP.LIB.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CustomRenderer
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class page상품상세관리 : ContentPage
	{
        private string _data = string.Empty;

        public page상품상세관리 (string data)
		{
			InitializeComponent ();

            hybridWebView.RegisterAction(x => ShowData(x));

            hybridWebView.BatchBegin();

            hybridWebView.OnLoadPage += onShowPage;

            _data = data;
        }

        protected override void OnAppearing()
        {

        }

        private void ShowData(string str)
        {
            var data = JsonTool.Deserialize<이벤트데이터>(str);

            if (string.IsNullOrEmpty(_data))
            {
                이벤트데이터 데이터 = new 이벤트데이터();
                데이터.view = HARDCODE.화면.상품;
                데이터.handle = HARDCODE.이벤트.등록;
                데이터.data = data.data;

                var json = JsonTool.Serialize(데이터);

                이벤트처리기.이벤트처리(json);
            }
            else
            {
                이벤트데이터 데이터 = new 이벤트데이터();
                데이터.view = HARDCODE.화면.상품;
                데이터.handle = HARDCODE.이벤트.수정;
                데이터.data = data.data;

                var json = JsonTool.Serialize(데이터);

                이벤트처리기.이벤트처리(json);
            }
        }

        private void onShowPage()
        {
            이벤트데이터 데이터 = new 이벤트데이터();
            if (!string.IsNullOrEmpty(_data))
            {
                데이터.handle = HARDCODE.명령문.표출;
                데이터.view = "ALL";
                데이터.value = JsonTool.Deserialize<DATA_Item>(_data);

                var data = JsonTool.Serialize(데이터);

                hybridWebView.ShowResult(data);
            }

            base.OnAppearing();
        }
    }
}