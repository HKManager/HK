using System;
using Android.Content;
using Android.Widget;

namespace Solidroid
{
	public class ToastMessage
	{
		private Context _context;

		public ToastMessage(Context context)
		{
			_context = context;
		}

		public void ShowToast_ResID(int id)
		{
			Toast.MakeText(_context, _context.Resources.GetText(id), ToastLength.Short).Show();
		}

		public void ShowToast_ResID(int id, String str)
		{
			Toast.MakeText(_context, _context.Resources.GetText(id), ToastLength.Short).Show();
		}

		public void ShowToast_ResID_Long(int id)
		{
			Toast.MakeText(_context, _context.Resources.GetText(id), ToastLength.Long).Show();
		}

		public void ShowToast_ResID_Long(int id, String str)
		{
			Toast.MakeText(_context, _context.Resources.GetText(id), ToastLength.Long).Show();
		}

		public void ShowToast_Text(String text)
		{
			Toast.MakeText(_context, text, ToastLength.Short).Show();
		}
	}
}

