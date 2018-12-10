using System;
using Android.Webkit;
using CustomRenderer.Droid;
using Java.Interop;

namespace CustomRenderer.Droid
{
	public class JSBridge : Java.Lang.Object
	{
		readonly WeakReference<HybridWebViewRenderer> hybridWebViewRenderer;

        public event Action<string> ShowData;

        HybridWebViewRenderer _hybridRenderer;

        public JSBridge (HybridWebViewRenderer hybridRenderer)
		{
			hybridWebViewRenderer = new WeakReference <HybridWebViewRenderer> (hybridRenderer);

            _hybridRenderer = hybridRenderer;

            _hybridRenderer.Element.ShowData += onShowData;

        }

        public void LoadPage()
        {
            _hybridRenderer.Element.LoadPage();
        }

        private void onShowData(string data)
        {
            ShowData?.Invoke(data);
        }

		[JavascriptInterface]
		[Export ("invokeAction")]
		public void InvokeAction (string data)
		{
			HybridWebViewRenderer hybridRenderer;

			if (hybridWebViewRenderer != null && hybridWebViewRenderer.TryGetTarget (out hybridRenderer)) {
				hybridRenderer.Element.InvokeAction (data);
			}
		}
	}
}

