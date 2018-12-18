using System;
using System.Collections.Generic;

namespace SolidDataType
{
	public static class StaticData
	{
		public static Size SIZE { set; get; }
	}

	public class Events
	{
		public event Action<string> SearchGeoName;
	}

	public class Size
	{
		public double ScreenHeight { set; get; }
		public double ScreenWidth { set; get; }
	}
}

