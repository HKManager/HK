using System;
using Newtonsoft.Json;

namespace Solidroid
{
public static class ConvertJson
	{
		public static ResultData<T> ConvertJsonToData_ResultType<T>(string json)
		{
			try
			{

				var list = JsonConvert.DeserializeObject<ResultData<T>>(json.ToString());

				return list;
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public static T ConvertJsonToData_Type<T>(string json)
		{
			try
			{

				var list = JsonConvert.DeserializeObject<T>(json.ToString());

				return list;
			}
			catch (Exception ex)
			{
				return default(T);
			}
		}

		public static string ConvertDataToJson(object data)
		{
			var jsonDoc = JsonConvert.SerializeObject(data);

			return jsonDoc;
		}

		public static string ConvertJsonString(string json)
		{
			var data = JsonConvert.DeserializeObject(json);

			return data.ToString();
		}
	}
}

