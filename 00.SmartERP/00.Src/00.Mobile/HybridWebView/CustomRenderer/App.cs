using CustomRenderer.Views;
using HK.SmartERP.Data;
using SQLite.Net;
using Xamarin.Forms;

namespace CustomRenderer
{
	public class App : Application
	{
        private SQLiteConnection conn;

        public App ()
		{
            conn = DependencyService.Get<ISQLite>().GetConnection();

            연결자_Sqlite.DB연결자 = conn;

            //MainPage = new HybridWebViewPage();
            //MainPage = new pageMain();
            MainPage = new page퍼즐_예은();
        }

        protected override void OnStart ()
		{
			// Handle when your app starts
		}

		protected override void OnSleep ()
		{
			// Handle when your app sleeps
		}

		protected override void OnResume ()
		{
			// Handle when your app resumes
		}
	}
}

