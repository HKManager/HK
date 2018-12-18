using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Json;

namespace Solidroid
{
	public static class WebService
	{
		public static string GetURL(params string[] urls)
		{
			string result = string.Empty;
			foreach (string url in urls)
			{
				result += url;
			}

			return result;
		}

		#region Get
		public static async Task<ResultData<T>> Get<T>(String url, Dictionary<string, object> parameters = null)
		{
			try
			{
				WebService_Rest service = new WebService_Rest();
				JsonValue jsonData;
				if (parameters != null)
				{
					jsonData = await service.Get(url, parameters);
				}
				else {
					jsonData = await service.Get(url);
				}

				return ConvertJson.ConvertJsonToData_ResultType<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public static async Task<T> Get_Data<T>(String url, Dictionary<string, object> parameters = null)
		{
			try
			{
				WebService_Rest service = new WebService_Rest();
				JsonValue jsonData;
				if (parameters != null)
				{
					jsonData = await service.Get(url, parameters);
				}
				else {
					jsonData = await service.Get(url);
				}

				return ConvertJson.ConvertJsonToData_Type<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return default(T);
			}
		}
		#endregion

		#region Create
		public static async Task<ResultData<T>> Create<T>(String url, Dictionary<string, object> parameters)
		{
			try
			{
				if (parameters == null)
					return null;

				WebService_Rest service = new WebService_Rest();
				String jsonString = ConvertJson.ConvertDataToJson(parameters);
				JsonValue jsonData = await service.Post(url, jsonString);

				return ConvertJson.ConvertJsonToData_ResultType<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public static async Task<T> Create_Data<T>(String url, Dictionary<string, object> parameters)
		{
			try
			{
				if (parameters == null)
					return default(T);

				WebService_Rest service = new WebService_Rest();
				String jsonString = ConvertJson.ConvertDataToJson(parameters);
				JsonValue jsonData = await service.Post(url, jsonString);

				return ConvertJson.ConvertJsonToData_Type<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return default(T);
			}
		}

		public static async Task<T> Create_Data<T>(String url, object data)
		{
			try
			{
				if (data == null)
					return default(T);

				WebService_Rest service = new WebService_Rest();
				String jsonString = ConvertJson.ConvertDataToJson(data);
				JsonValue jsonData = await service.Post(url, jsonString);

				return ConvertJson.ConvertJsonToData_Type<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return default(T);
			}
		}
		#endregion

		#region Update
		public static async Task<ResultData<T>> Update<T>(String url, object data)
		{
			try
			{
				if (data == null)
					return null;

				WebService_Rest service = new WebService_Rest();
				String jsonString = ConvertJson.ConvertDataToJson(data);
				JsonValue jsonData = await service.Put(url, jsonString);

				return ConvertJson.ConvertJsonToData_ResultType<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public static async Task<T> Update_Data<T>(String url, object data)
		{
			try
			{
				if (data == null)
					return default(T);

				WebService_Rest service = new WebService_Rest();
				String jsonString = ConvertJson.ConvertDataToJson(data);
				JsonValue jsonData = await service.Put(url, jsonString);

				return ConvertJson.ConvertJsonToData_Type<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return default(T);
			}
		}
		#endregion

		#region Delete
		public static async Task<ResultData<T>> Delete<T>(String url, Dictionary<string, object> parameters)
		{
			try
			{
				if (parameters == null)
					return null;

				WebService_Rest service = new WebService_Rest();
				JsonValue jsonData = await service.Delete(url, parameters);

				return ConvertJson.ConvertJsonToData_ResultType<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public static async Task<T> Delete_Data<T>(String url, Dictionary<string, object> parameters)
		{
			try
			{
				if (parameters == null)
					return default(T);

				WebService_Rest service = new WebService_Rest();
				JsonValue jsonData = await service.Delete(url, parameters);

				return ConvertJson.ConvertJsonToData_Type<T>(jsonData.ToString());
			}
			catch (Exception ex)
			{
				return default(T);
			}
		}
		#endregion
	}
}

