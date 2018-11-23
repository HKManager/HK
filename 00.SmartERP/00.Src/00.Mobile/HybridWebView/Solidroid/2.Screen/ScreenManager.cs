using System;
using Android.OS;
using Android.Content;
using Android.Util;
using Android.App;

namespace Solidroid
{
public class ScreenManager
	{
		#region Screen ON /OFF
		private PowerManager.WakeLock sWakeLock;
		private object LOCK = new object();
		//		private TimeReceiver _receiver;
		private Context _context;

		//		private bool isScreenON = false;

		public static DisplayMetrics GetDisplayMetrics(Activity activity)
		{
			DisplayMetrics displayMetrics = new DisplayMetrics();
			activity.WindowManager.DefaultDisplay.GetMetrics(displayMetrics);

			return displayMetrics;
		}

		public ScreenManager(Context context)
		{
			//			_receiver = new TimeReceiver ();
			//			_receiver.Time_Changed += OnTimeChanged;

			_context = context;

			//			IntentFilter filter = new IntentFilter ();
			//			filter.AddAction (Intent.ActionTimeTick);
			//			_context.RegisterReceiver (_receiver, filter);
		}

		public void ONScreen()
		{
			//create the wake lock
			lock (LOCK)
			{
				if (sWakeLock == null)
				{
					// This is called from BroadcastReceiver, there is no init.
					var pm = (PowerManager)_context.GetSystemService(Context.PowerService);
					sWakeLock = pm.NewWakeLock(
						WakeLockFlags.ScreenBright | WakeLockFlags.Full | WakeLockFlags.AcquireCausesWakeup, _context.Class.Name);
				}
			}

			sWakeLock.Acquire();
			//			isScreenON = true;
		}

		public void OffScreen()
		{
			lock (LOCK)
			{
				//				isScreenON = false;
				//Sanity check for null as this is a public method
				if (sWakeLock != null)
					sWakeLock.Release();
			}
		}

		//		public void OnTimeChanged() {
		//			try {
		//				if(!isScreenON)
		//					return;
		//
		//				OffScreen();
		//
		//				if (_receiver != null) {
		//					_context.UnregisterReceiver (_receiver);
		//				}
		//			} catch(System.Exception ex)
		//			{
		//				Log.Error ("Service", ex.ToString ());
		//			}
		//		}
		#endregion Screen ON /OFF

		#region Notification
		public void Show_NotiCallMain(Activity act, Type type, string appName, string message)
		{
			try
			{
				Intent intent;

				var notificationManager = _context.GetSystemService(Context.NotificationService) as NotificationManager;

				if (act == null)
				{
					intent = new Intent(_context, type);
					intent.SetFlags(ActivityFlags.NewTask | ActivityFlags.ResetTaskIfNeeded);
				}
				else {
					if (act.IsFinishing)
					{
						intent = new Intent(_context, type);
						intent.SetFlags(ActivityFlags.NewTask | ActivityFlags.ResetTaskIfNeeded);
					}
					else {
						return;
					}
				}

				var notification = new Notification(Android.Resource.Drawable.SymActionEmail, appName);
				notification.Flags = NotificationFlags.AutoCancel;
				notification.SetLatestEventInfo(_context, appName, message, PendingIntent.GetActivity(_context, 0, intent, PendingIntentFlags.CancelCurrent));
				notificationManager.Notify(0, notification);
			}
			catch (System.Exception ex)
			{
			}
		}

		public void Show_NotiCallMain(Activity act, Type type, string appName, string message, string key, string data)
		{
			try
			{
				Intent intent;

				var notificationManager = _context.GetSystemService(Context.NotificationService) as NotificationManager;

				if (act == null)
				{
					intent = new Intent(_context, type);
					intent.SetFlags(ActivityFlags.NewTask | ActivityFlags.ResetTaskIfNeeded);
					intent.PutExtra(key, data);
				}
				else {
					if (act.IsFinishing)
					{
						intent = new Intent(_context, type);
						intent.SetFlags(ActivityFlags.NewTask | ActivityFlags.ResetTaskIfNeeded);
						intent.PutExtra(key, data);
					}
					else {
						return;
					}
				}

				var notification = new Notification(Android.Resource.Drawable.SymActionEmail, appName);
				notification.Flags = NotificationFlags.AutoCancel;
				notification.SetLatestEventInfo(_context, appName, message, PendingIntent.GetActivity(_context, 0, intent, PendingIntentFlags.CancelCurrent));
				notificationManager.Notify(0, notification);
			}
			catch (System.Exception ex)
			{
			}
		}

		public void Show_NotiCallAct(Activity act, Type mainType, Type callType, string appName, string message, string key, string data)
		{
			try
			{
				Intent intent;

				var notificationManager = _context.GetSystemService(Context.NotificationService) as NotificationManager;

				if (act == null)
				{
					intent = new Intent(_context, mainType);
					intent.SetFlags(ActivityFlags.NewTask | ActivityFlags.ResetTaskIfNeeded);
					intent.PutExtra(key, data);
				}
				else {
					if (act.IsFinishing)
					{
						intent = new Intent(_context, mainType);
						intent.SetFlags(ActivityFlags.NewTask | ActivityFlags.ResetTaskIfNeeded);
						intent.PutExtra(key, data);
					}
					else {
						intent = new Intent(_context, callType);
						intent.PutExtra(key, data);
					}
				}

				var notification = new Notification(Android.Resource.Drawable.SymActionEmail, appName);
				notification.Flags = NotificationFlags.AutoCancel;
				notification.SetLatestEventInfo(_context, appName, message, PendingIntent.GetActivity(_context, 0, intent, PendingIntentFlags.CancelCurrent));
				notificationManager.Notify(0, notification);
			}
			catch (System.Exception ex)
			{
			}
		}
		#endregion Notification
	}




	#region BroadcastReceiver
	class TimeReceiver : BroadcastReceiver
	{
		public Action Time_Changed;

		public override void OnReceive(Context context, Intent intent)
		{
			try
			{
				string action = intent.Action;


				if (action.Equals(Intent.ActionTimeTick))
				{
					Time_Changed();
				}
			}
			catch (System.Exception ex)
			{
			}
		}
	}
	#endregion
}

