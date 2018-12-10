using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Webkit;
using Android.Widget;

namespace CustomRenderer.Droid
{
    class WevViewCllientCallback : WebViewClient
    {
        public event EventHandler PageLoaded = delegate { };

        public override void OnPageFinished(WebView view, string url)
        {
            base.OnPageFinished(view, url);
            PageLoaded(this, EventArgs.Empty);
        }
    }
}