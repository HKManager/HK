using System;
using Android.Graphics;
using System.Net;

namespace Solidroid
{
	public class WebService_Normal
	{
		private WebClient _webClient;

		public WebService_Normal()
		{
			_webClient = new WebClient();
		}

		public Bitmap GetImageBitmapFromUrl(string url)
		{
			Bitmap imageBitmap = null;

			using (var webClient = new WebClient())
			{
				var imageBytes = webClient.DownloadData(url);
				if (imageBytes != null && imageBytes.Length > 0)
				{
					imageBitmap = BitmapFactory.DecodeByteArray(imageBytes, 0, imageBytes.Length);
				}
			}

			return imageBitmap;
		}
	}
}

