using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Android.Views;
using System;

namespace CustomRenderer.Droid
{
    //[Activity(Label = "CustomRenderer.Droid", Icon = "@drawable/icon", Theme = "@style/MainTheme", ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    [Activity(Label = "CustomRenderer.Droid", Icon = "@drawable/icon", Theme = "@style/MainTheme", ScreenOrientation = ScreenOrientation.Landscape)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        public event EventHandler<ActivityResultEventArgs> ActivityResult = delegate { };

        protected override void OnCreate(Bundle bundle)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            this.Window.AddFlags(WindowManagerFlags.Fullscreen);


            base.OnCreate(bundle);
            global::Xamarin.Forms.Forms.Init(this, bundle);
            

            if (!FileManager.isCheckFile(this, "SmartERP", "smarterp_farm.db"))
                FileManager.CopyFile(this, "SmartERP", "smarterp_farm.db");

            LoadApplication(new App());
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


        protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
        {
            ActivityResult(this, new ActivityResultEventArgs
            {
                RequestCode = requestCode,
                ResultCode = resultCode,
                Data = data
            });
        }
    }
}

