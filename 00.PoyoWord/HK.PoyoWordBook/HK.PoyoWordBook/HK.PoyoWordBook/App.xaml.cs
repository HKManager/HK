using HK.PoyoWordBook.Data;
using SQLite.Net;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace HK.PoyoWordBook
{
    public partial class App : Application
    {
        private SQLiteConnection conn;

        public App()
        {
            InitializeComponent();

            conn = DependencyService.Get<ISQLite>().GetConnection();

            연결자_Sqlite.DB연결자 = conn;

            MainPage = new MainPage();
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
