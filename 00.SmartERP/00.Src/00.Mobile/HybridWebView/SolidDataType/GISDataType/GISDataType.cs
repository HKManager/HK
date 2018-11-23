using System;
using System.Runtime.Serialization;

namespace SolidDataType
{
	public class GeocodeType
	{
		public string ContryCode { set; get; }
		public string ContryName { set; get; }
		public string FeatureName { set; get; }
		public double Latitude { set; get; }
		public double Longitude { set; get; }
		public string Address { set; get; }
		public string FullAddress { set; get; }
	}

	public class GeoPointType
	{
		public double Latitude { get; set; }
		public double Longitude { set; get; }

		public GeoPointType(double lat, double lon)
		{
			Latitude = lat;
			Longitude = lon;
		}
	}
}

