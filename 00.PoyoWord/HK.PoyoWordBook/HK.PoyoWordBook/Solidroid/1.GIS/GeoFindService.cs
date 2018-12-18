using System;
using System.Collections.Generic;
using System.Linq;
using Android.Content;
using Android.Locations;
using SolidDataType;

namespace Solidroid
{
public class GeoFindService
	{
		private Context _context;
		private Geocoder _geoCoder;

		private List<GeocodeType> _geoList;

		public GeoFindService(Context context)
		{
			_context = context;

			_geoCoder = new Geocoder(_context, Java.Util.Locale.Korea);
			_geoList = new List<GeocodeType>();
		}

		public List<GeocodeType> GetGeoCode(GeoPointType point)
		{

			ClearData();

			List<Android.Locations.Address> _locationList = _geoCoder.GetFromLocation(point.Latitude, point.Longitude, 5).ToList();

			_geoList = GetGeoCodes(_locationList);

			return _geoList;
		}

		public List<GeocodeType> GetGeoCode(string searchName)
		{
			if (string.IsNullOrEmpty(searchName))
				return null;

			ClearData();

			var result = _geoCoder.GetFromLocationName(searchName, 20);

			if (result == null)
				return null;

			List<Android.Locations.Address> _locationList = result.ToList();

			_geoList = GetGeoCodes(_locationList);

			return _geoList;
		}

		private void ClearData()
		{

			if (_geoList != null)
			{
				_geoList.Clear();
			}
		}

		private List<GeocodeType> GetGeoCodes(List<Android.Locations.Address> geocodeList)
		{
			List<GeocodeType> list = new List<GeocodeType>();

			foreach (var item in geocodeList)
			{
				list.Add(new GeocodeType
				{
					Address = item.GetAddressLine(0),
					FullAddress = string.Format("{0} {1}", item.GetAddressLine(0), item.FeatureName),
					FeatureName = item.FeatureName,
					ContryCode = item.CountryCode,
					ContryName = item.CountryName,
					Longitude = item.Longitude,
					Latitude = item.Latitude
				});
			}

			return list;
		}
	}
}

