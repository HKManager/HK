using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Android.Views;
using Android.Webkit;
using System;

namespace HK.PoyoWordBook.Droid
{
    [Activity(Label = "abc", Icon = "@mipmap/icon", Theme = "@style/MyTheme.Splash", MainLauncher = true, NoHistory = true, ScreenOrientation = ScreenOrientation.Portrait)]
    public class Act_Intro : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            //SetContentView(Resource.Layout.layoutIntro);

            //var webView = FindViewById<WebView>(Resource.Id.webView);
            //webView.LoadUrl("http://www.naver.com");
            //webView.LoadUrl("file:///android_asset/Game/image/intro.html");
        }

        protected override void OnResume()
        {
            SimulateStartup();

            base.OnResume();
        }

        void SimulateStartup()
        {
            //await Task.Delay(2000); // Simulate a bit of startup work.
            StartActivity(new Intent(Application.Context, typeof(MainActivity)));
        }
    }
}