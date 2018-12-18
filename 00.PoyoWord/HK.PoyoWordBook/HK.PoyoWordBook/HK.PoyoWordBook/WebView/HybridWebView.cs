using System;
using Xamarin.Forms;

namespace HK.PoyoWordBook
{
    public class HybridWebView : View
    {
        Action<string> action;

        public event Action<string> ShowData;

        public event Action OnLoadPage;

        public static readonly BindableProperty UriProperty = BindableProperty.Create(
            propertyName: "Uri",
            returnType: typeof(string),
            declaringType: typeof(HybridWebView),
            defaultValue: default(string));

        public string Uri
        {
            get { return (string)GetValue(UriProperty); }
            set { SetValue(UriProperty, value); }
        }

        public void RegisterAction(Action<string> callback)
        {
            action = callback;
        }

        public void Cleanup()
        {
            action = null;
        }

        public void InvokeAction(string data)
        {
            if (action == null || data == null)
            {
                return;
            }
            action.Invoke(data);
        }

        public void ShowResult(string data)
        {
            ShowData?.Invoke(data);
        }

        public void LoadPage()
        {
            OnLoadPage?.Invoke();
        }
    }
}
