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
    public partial class page거래처상세관리 : ContentPage
    {
        private string _data = string.Empty;

        public page거래처상세관리(string data)
        {
            InitializeComponent();

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

        }

        private void onShowPage()
        {
            이벤트데이터 데이터 = new 이벤트데이터();

            데이터.handle = "SHOW";
            데이터.view = "AC_TYPE_CODES";
            데이터.value = CodeManager.GetAllList_2nd("015");

            var type = JsonTool.Serialize(데이터);

            hybridWebView.ShowResult(type);

            if (!string.IsNullOrEmpty(_data))
            {
                데이터.handle = "SHOW";
                데이터.view = "ALL";
                데이터.value = JsonTool.Deserialize<DATA_Account>(_data);

                var data = JsonTool.Serialize(데이터);

                hybridWebView.ShowResult(data);
            }

            base.OnAppearing();
        }
    }
}