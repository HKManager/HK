using System;
using Newtonsoft.Json;

namespace Solidroid
{
public static class ResultDataName
	{
		public const string Success = "success";
		public const string Page = "page";
		public const string Error = "error";
		public const string Result = "result";
	}

	public static class PageDataName
	{
		public const string TotalItemCount = "totalitemcount";
		public const string FirstPage = "firstpage";
		public const string CurrentPage = "currentpage";
		public const string LastPage = "lastpage";
	}

	public static class ErrorMsgDataName
	{
		public const string ErrorCode = "errorcode";
		public const string ErrorString = "errorstring";
	}

	public static class PagingDataName
	{
		public const string Limit = "limit";
		public const string Page = "page";
		public const string SortColumn = "sortColumn";
		public const string SortOrder = "sortOrder";
		public const string Asc = "asc";
		public const string Desc = "desc";
	}

	public class PagingData
	{
		[JsonProperty(PropertyName = PageDataName.TotalItemCount)]
		public int TotalItemCount { set; get; }

		[JsonProperty(PropertyName = PageDataName.FirstPage)]
		public int FirstPage { set; get; }

		[JsonProperty(PropertyName = PageDataName.CurrentPage)]
		public int CurrentPage { set; get; }

		[JsonProperty(PropertyName = PageDataName.LastPage)]
		public int LastPage { set; get; }
	}

	public class ErrorMsg
	{
		[JsonProperty(PropertyName = ErrorMsgDataName.ErrorCode)]
		public int ErrorCode { set; get; }

		[JsonProperty(PropertyName = ErrorMsgDataName.ErrorString)]
		public string ErrorString { set; get; }
	}

	public class ResultData<T>
	{
		public ResultData()
		{
			Success = false;
			Page = null;
			Error = null;
			Data = default(T);
		}

		[JsonProperty(PropertyName = ResultDataName.Success)]
		public bool Success { set; get; }

		[JsonProperty(PropertyName = ResultDataName.Page)]
		public PagingData Page { set; get; }

		[JsonProperty(PropertyName = ResultDataName.Error)]
		public ErrorMsg Error { set; get; }

		[JsonProperty(PropertyName = ResultDataName.Result)]
		public T Data { set; get; }
	}
}

