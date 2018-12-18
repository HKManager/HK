using System;
using System.IO;
using SQLite;

namespace Solidroid
{
	public class DBConnector
	{
		private String _path;

		public SQLiteConnection Connector { private set; get; }

		public DBConnector(String path)
		{
			_path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Personal), path);

			Connector = new SQLiteConnection(_path);
		}
	}
}

