﻿using HK.PoyoWordBook;
using HK.PoyoWordBook.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using Android.Content;
using Java.Lang;
using Android.OS;
using Android.Webkit;
using System;

[assembly: ExportRenderer(typeof(HybridWebView), typeof(HybridWebViewRenderer))]
namespace HK.PoyoWordBook.Droid
{
    public class HybridWebViewRenderer : ViewRenderer<HybridWebView, Android.Webkit.WebView>
    {
        const string JavaScriptFunction = "function invokeCSharpAction(data){jsBridge.invokeAction(data);}";
        Context _context;

        JSBridge brige = null;

        WevViewCllientCallback webViewCallBack = new WevViewCllientCallback();

        public HybridWebViewRenderer(Context context) : base(context)
        {
            _context = context;
        }

        protected override void OnElementChanged(ElementChangedEventArgs<HybridWebView> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                var webView = new Android.Webkit.WebView(_context);
                webView.Settings.JavaScriptEnabled = true;

                webView.SetWebChromeClient(new WebChromeClient());

                SetNativeControl(webView);
            }
            if (e.OldElement != null)
            {
                Control.RemoveJavascriptInterface("jsBridge");
                var hybridWebView = e.OldElement as HybridWebView;
                hybridWebView.Cleanup();
            }
            if (e.NewElement != null)
            {
                brige = new JSBridge(this);
                brige.ShowData += onShowData;

                webViewCallBack.PageLoaded += delegate (object sender, EventArgs ex) {


                    brige.LoadPage();

                    // What to do next? 
                    // Do the things you want to do after PageIsLoaded  
                };

                Control.SetWebViewClient(webViewCallBack);

                Control.AddJavascriptInterface(brige, "jsBridge");
                //Control.LoadUrl(string.Format("file:///android_asset/Content/views/{0}", Element.Uri));
                //Control.LoadUrl(string.Format("file:///android_asset/Game/{0}", Element.Uri));
                Control.LoadUrl($"file:///android_asset/Poyo/{Element.Uri}");
                InjectJS(JavaScriptFunction);
            }
        }

        private void onShowData(string data)
        {
            data = data.Replace(@"\", "");

            string script = $"javascript:logForXamarin('{data}')";

            //Control.LoadUrl(script, null);

            //Control.Post(new Runnable(() =>
            //{
            //    void Run()
            //    {
            //        Control.EvaluateJavascript(script, null);
            //    }
            //}));

            using (var h = new Handler(Looper.MainLooper))
                h.Post(() => {
                    Control.LoadUrl(script);
                });
        }

        void InjectJS(string script)
        {
            if (Control != null)
            {
                Control.LoadUrl(string.Format("javascript: {0}", script));
            }
        }
    }
}