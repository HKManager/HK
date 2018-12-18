using System;
using Android.Content;
using Android.Preferences;

namespace Solidroid
{
	public static class ServiceManager
	{
		private static ISharedPreferences prefs;

		public static string GetServerAddress(Context context)
		{
			if (prefs == null)
			{
				prefs = PreferenceManager.GetDefaultSharedPreferences(context);
			}
			var data = prefs.GetString("ServerAddress", "http://solutioncenter.winitech.com/SafeGuard_Service");

			var temp = data.Substring(data.Length - 1);
			if (temp.Equals("/"))
				return data;
			else
				return string.Format("{0}/", data);
		}
		public static void SetServerAddress(Context context, string address)
		{
			if (prefs == null)
			{
				prefs = PreferenceManager.GetDefaultSharedPreferences(context);
			}
			ISharedPreferencesEditor editor = prefs.Edit();
			editor.PutString("ServerAddress", address);
			editor.Apply();
			editor.Commit();
		}

		public static string GetServerTempAddress(Context context)
		{
			if (prefs == null)
			{
				prefs = PreferenceManager.GetDefaultSharedPreferences(context);
			}
			var data = prefs.GetString("TempAddress", "http://safeguard.winitech.com/Safeguard_Service/");

			var temp = data.Substring(data.Length - 1);
			if (temp.Equals("/"))
				return data;
			else
				return string.Format("{0}/", data);
		}

		public static void SetServerTempAddress(Context context, string address)
		{
			if (prefs == null)
			{
				prefs = PreferenceManager.GetDefaultSharedPreferences(context);
			}
			ISharedPreferencesEditor editor = prefs.Edit();
			editor.PutString("TempAddress", address);
			editor.Apply();
			editor.Commit();
		}
	}
}

