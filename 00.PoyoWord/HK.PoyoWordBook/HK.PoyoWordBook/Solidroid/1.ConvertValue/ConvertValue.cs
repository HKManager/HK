using System;
using Android.Content;
using Android.Graphics;

namespace Solidroid
{
public static class ConvertValue
	{
		public static String GetConvertText(Context context, int resource)
		{
			return context.Resources.GetText(resource);
		}

		public static Color GetColor(int resource)
		{
			return new Color(resource);
		}

		public static string Parse<T>(T value) where T : struct
		{
			string str = string.Empty;

			if (value is int)
				str = string.Format("{0:#,##0}", value);
			else if ((value is float) || (value is double))
				str = string.Format("{0:#,##0.##}", value);
			else
				str = string.Empty;

			return str;
		}

		public static string Parse(object value)
		{
			return string.Format("{0:#,##0.##}", value);
		}

		public static string Parse(string value)
		{
			double str = 0;

			if (string.IsNullOrEmpty(value))
				return null;
			else
				str = Convert.ToDouble(value);

			return Parse<double>(str);
		}
	}
}

