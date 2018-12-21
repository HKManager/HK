﻿using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Android.Views;
using Solidroid;
using System;

namespace HK.PoyoWordBook.Droid
{
    //[Activity(Label = "HK.PoyoWordBook", Icon = "@mipmap/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    [Activity(Label = "CustomRenderer.Droid", Icon = "@mipmap/icon", Theme = "@style/MainTheme", ScreenOrientation = ScreenOrientation.Landscape)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        //public event EventHandler<ActivityResultEventArgs> ActivityResult = delegate { };

        protected override void OnCreate(Bundle savedInstanceState)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            this.Window.AddFlags(WindowManagerFlags.Fullscreen);

            base.OnCreate(savedInstanceState);
            global::Xamarin.Forms.Forms.Init(this, savedInstanceState);

            if (!FileManager.isCheckFile(this, "SmartERP", "smarterp_farm.db"))
                FileManager.CopyFile(this, "SmartERP", "smarterp_farm.db");


            var width = Resources.DisplayMetrics.WidthPixels;
            var height = Resources.DisplayMetrics.HeightPixels;
            var density = Resources.DisplayMetrics.Density;

            var ScreenWidth = (width - 0.5f) / density;
            var ScreenHeight = (height - 0.5f) / density;

            LoadApplication(new App((int)ScreenWidth, (int)ScreenHeight));
        }

        public void SetDevicePortaitOrientation()
        {
            this.RequestedOrientation = ScreenOrientation.Portrait;
        }

        public void SetDeviceLandscapeOrientation()
        {
            this.RequestedOrientation = ScreenOrientation.Landscape;
        }

        public void SetAutoDetectOrientation()
        {
            this.RequestedOrientation = ScreenOrientation.Sensor;
        }

        //protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
        //{
        //    ActivityResult(this, new ActivityResultEventArgs
        //    {
        //        RequestCode = requestCode,
        //        ResultCode = resultCode,
        //        Data = data
        //    });
        //}
    }
}