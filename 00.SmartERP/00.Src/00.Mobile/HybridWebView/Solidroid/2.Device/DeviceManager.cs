using System;
using Android.Telephony;
using Android.App;
using Java.Util;
using Android.Preferences;
using Android.Content;

namespace Solidroid
{
public static class DeviceManager
	{
		private static ISharedPreferences prefs;

		public static string GetDeviceID(Context activity)
		{
			if (prefs == null)
			{
				prefs = PreferenceManager.GetDefaultSharedPreferences(activity);
			}
			return prefs.GetString("DeviceID", "");
		}

		public static void SetDeviceID(Activity activity)
		{
			var telephonyDeviceID = string.Empty;
			var telephonySIMSerialNumber = string.Empty;
			TelephonyManager telephonyManager = (TelephonyManager)activity.ApplicationContext.GetSystemService(Context.TelephonyService);
			if (telephonyManager != null)
			{
				if (!string.IsNullOrEmpty(telephonyManager.DeviceId))
					telephonyDeviceID = telephonyManager.DeviceId;
				if (!string.IsNullOrEmpty(telephonyManager.SimSerialNumber))
					telephonySIMSerialNumber = telephonyManager.SimSerialNumber;
			}
			var androidID = Android.Provider.Settings.Secure.GetString(activity.ApplicationContext.ContentResolver, Android.Provider.Settings.Secure.AndroidId);
			var deviceUuid = new UUID(androidID.GetHashCode(), ((long)telephonyDeviceID.GetHashCode() << 32) | telephonySIMSerialNumber.GetHashCode());

			if (prefs == null)
			{
				prefs = PreferenceManager.GetDefaultSharedPreferences(activity);
			}
			ISharedPreferencesEditor editor = prefs.Edit();
			editor.PutString("DeviceID", deviceUuid.ToString());
			editor.Apply();
			editor.Commit();
		}
	}
}

