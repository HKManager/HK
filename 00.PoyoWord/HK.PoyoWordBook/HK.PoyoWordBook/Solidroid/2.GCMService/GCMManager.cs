using System;
using Android.Content;
using Gcm.Client;

namespace Solidroid
{
	public class GCMManager
	{
		private Context _context;

		public GCMManager(Context context)
		{
			_context = context;
		}

		public void Register()
		{
			GcmClient.Register(_context, GcmBroadcastReceiver.SENDER_IDS);
		}

		public void Delete()
		{
			GcmClient.UnRegister(_context);
		}

		public string GetGCMID()
		{
			return GcmClient.GetRegistrationId(_context);
		}
	}
}

