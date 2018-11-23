using System;
using System.Threading.Tasks;
using System.Json;
using System.Net;
using System.IO;
using System.Collections.Generic;
using RestSharp;

namespace Solidroid
{
	public class WebService_Rest
	{
		private String TAG = "Web Service";

		private int _timeout { set; get; }
		private bool isFirst = false;

		public WebService_Rest()
		{
			_timeout = 10000;
		}

		private string GetParamURL(string url, Dictionary<string, object> param)
		{
			string type = "?";
			if (param != null)
			{
				foreach (var item in param)
				{
					url += string.Format("{0}{1}={2}", type, item.Key, item.Value);
					type = "&";
				}
			}

			return url;
		}

		// Get
		public async Task<JsonValue> Get(string url, Dictionary<string, object> param = null)
		{
			// Create an HTTP web request using the URL:
			HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(new Uri(GetParamURL(url, param)));
			request.ContentType = "application/json";
			request.Method = "GET";
			request.Timeout = _timeout;

			// Send the request to the server and wait for the response:
			using (WebResponse response = await request.GetResponseAsync())
			{
				// Get a stream representation of the HTTP web response:
				using (Stream stream = response.GetResponseStream())
				{
					// Use this stream to build a JSON document object:
					JsonValue jsonDoc = await Task.Run(() => System.Json.JsonObject.Load(stream));
					Console.Out.WriteLine("Response: {0}", jsonDoc.ToString());

					// Return the JSON document:
					return jsonDoc;
				}
			}
		}

		// Post
		public async Task<JsonValue> Post(string url, string jsonParam)
		{
			// Create an HTTP web request using the URL:
			HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(new Uri(url));
			request.ContentType = "application/json";
			request.Method = "POST";
			request.KeepAlive = false;
			request.Timeout = _timeout;

			using (var streamWriter = new StreamWriter(request.GetRequestStream()))
			{
				streamWriter.Write(jsonParam);
				streamWriter.Flush();
				streamWriter.Close();

				try
				{
					var httpResponse = (HttpWebResponse)request.GetResponse();
					using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
					{
						var result = await Task.Run(() => System.Json.JsonObject.Load(streamReader));
						Console.Out.WriteLine("Response Body: \r\n {0}", result);

						return result;
					}
				}
				catch (Exception ex)
				{
					Console.Out.WriteLine("Exception {0}", ex);
					return null;
				}
			}
		}

		// Post
		public async Task<JsonValue> Put(string url, string jsonParam)
		{
			// Create an HTTP web request using the URL:
			HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(new Uri(url));
			request.ContentType = "application/json";
			request.Method = "PUT";
			request.KeepAlive = false;
			request.Timeout = _timeout;

			using (var streamWriter = new StreamWriter(request.GetRequestStream()))
			{
				streamWriter.Write(jsonParam);
				streamWriter.Flush();
				streamWriter.Close();

				try
				{
					var httpResponse = (HttpWebResponse)request.GetResponse();
					using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
					{
						var result = await Task.Run(() => System.Json.JsonObject.Load(streamReader));
						Console.Out.WriteLine("Response Body: \r\n {0}", result);

						return result;
					}
				}
				catch (Exception ex)
				{
					Console.Out.WriteLine("Exception {0}", ex);
					return null;
				}
			}
		}

		// Delete
		public async Task<JsonValue> Delete(string url, Dictionary<string, object> param = null)
		{
			try
			{
				RestClient restClient = new RestClient(new Uri(GetParamURL(url, param)));
				Task.Factory.StartNew(() =>
				{
					var request = new RestRequest();
					request.RequestFormat = DataFormat.Json;
					request.Method = Method.DELETE;
					request.Timeout = _timeout;

					return restClient.Execute(request);
				}).ContinueWith(t =>
				{
					var jsonDoc = t.Result.Content;
					//Log.Info (TAG, "Response: {0}", jsonDoc.ToString());

					// Return the JSON document:
					return jsonDoc;
				}).Wait();
				return null;
			}
			catch (Exception ex)
			{
				Console.Out.WriteLine("Exception {0}", ex);
				return null;
			}
		}
	}
}

