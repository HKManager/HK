using System;
using Android.Content;
using Android.App;
using Android.Locations;
using Android.Util;
using Android.OS;

namespace Solidroid
{
	[Service]
	public class LocationService : Android.App.Service, ILocationListener
	{
		private LocationManager locMgr;
		private Context _context;
		private string tag = "Location Service";
		private ToastMessage _toast;

		public override IBinder OnBind(Intent intent)
		{
			throw new NotImplementedException();
		}

		public override void OnCreate()
		{
			_context = this;
			locMgr = GetSystemService(Context.LocationService) as LocationManager;
			_toast = new ToastMessage(this);
		}

		public override StartCommandResult OnStartCommand(Intent intent, StartCommandFlags flags, int startID)
		{
			if (locMgr.AllProviders.Contains(LocationManager.NetworkProvider)
				&& locMgr.IsProviderEnabled(LocationManager.NetworkProvider))
			{
				locMgr.RequestLocationUpdates(LocationManager.NetworkProvider, 2000, 1, this);
			}
			else {
				//Toast.MakeText (this, "The Network Provider does not exist or is not enabled!", ToastLength.Long).Show ();
			}
			return StartCommandResult.Sticky;
		}

		public override void OnDestroy()
		{
			locMgr.RemoveUpdates(this);
		}

		void ILocationListener.OnLocationChanged(Location location)
		{
			Log.Debug(tag, "Location changed");

			Intent intent = new Intent();
			intent.SetAction(StaticValue.LOCATION);
			var locData = new LocationType
			{
				accuracy = location.Accuracy,
				altitude = location.Altitude,
				bearing = location.Bearing,
				provider = location.Provider.ToString(),
				latitude = location.Latitude,
				longitude = location.Longitude
			};

			var locJson = ConvertJson.ConvertDataToJson(locData);
			intent.PutExtra(StaticValue.RESULT, locJson);
			this.SendBroadcast(intent);
		}

		void ILocationListener.OnProviderDisabled(string provider)
		{
			Log.Debug(tag, provider + " disabled by user");
		}

		void ILocationListener.OnProviderEnabled(string provider)
		{
			Log.Debug(tag, provider + " enabled by user");
		}

		void ILocationListener.OnStatusChanged(string provider, Availability status, Bundle extras)
		{
			Log.Debug(tag, provider + " availability has changed to " + status.ToString());
		}
	}
}

