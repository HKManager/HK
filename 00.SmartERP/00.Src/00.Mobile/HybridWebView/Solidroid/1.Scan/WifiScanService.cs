using System;
using System.Collections.Generic;
using Android.App;
using Android.Content;
using Android.Net.Wifi;
using Android.OS;
using Android.Util;

namespace Solidroid
{
	[Service]
	public class WifiScanService : Android.App.Service
	{
		private static WifiManager _wifiManager;
		private static Context _context;

		private const String TAG = "ScanService";
		private WifiScanThread thread;
		public ToastMessage _toast = null;
		private WifiReceiver _wifiReceiver;

		private static Boolean _isScan = false;

		public static IList<ScanResult> WIFIList
		{
			private set;
			get;
		}

		public WifiScanService()
		{
		}

		public override IBinder OnBind(Intent intent)
		{
			throw new NotImplementedException();
		}

		public override void OnCreate()
		{
			_wifiManager = (WifiManager)GetSystemService(WifiService);
			_wifiReceiver = new WifiReceiver();
			_context = this;
			_toast = new ToastMessage(this);

			if (!_wifiManager.IsWifiEnabled)
				_wifiManager.SetWifiEnabled(true);
		}

		public override StartCommandResult OnStartCommand(Intent intent, StartCommandFlags flags, int startID)
		{
			InitWifiScan();
			thread = new WifiScanThread();
			thread.Daemon = true;
			thread.Start();

			return StartCommandResult.Sticky;
		}

		public override void OnDestroy()
		{
			thread.Dispose();
			base.OnDestroy();
		}

		public void InitWifiScan()
		{
			try
			{
				IntentFilter filter = new IntentFilter(WifiManager.ScanResultsAvailableAction);
				filter.AddAction(WifiManager.NetworkStateChangedAction);
				RegisterReceiver(_wifiReceiver, filter);
				_wifiManager.StartScan();
				Log.Debug(TAG, "InitWifiScan()");
			}
			catch (Exception e)
			{
			}
		}

		class WifiReceiver : BroadcastReceiver
		{
			public override void OnReceive(Context context, Intent intent)
			{
				try
				{
					String action = intent.Action;
					if (action.Equals(WifiManager.ScanResultsAvailableAction))
					{
						if (_isScan)
						{
							this.SetWifiList();
							_isScan = false;
						}
						//TODO : GetResult();
						_wifiManager.StartScan();
					}
					else if (action.Equals(WifiManager.NetworkStateChangedAction))
					{

					}
				}
				catch (Exception ex)
				{
				}
			}

			private void SetWifiList()
			{
				WIFIList = _wifiManager.ScanResults;
				Intent intent = new Intent();
				intent.SetAction(StaticValue.SENSORSCANFLAG);
				_context.SendBroadcast(intent);
			}
		}

		class WifiScanThread : Java.Lang.Thread
		{
			public override void Run()
			{
				while (true)
				{
					try
					{
						_isScan = true;
						Sleep(1000);
					}
					catch (Exception ex)
					{
						Log.Error(TAG, ex.ToString());
					}
				}
			}
		}
	}
}

