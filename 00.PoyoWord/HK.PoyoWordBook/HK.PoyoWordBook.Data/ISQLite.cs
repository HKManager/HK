using System;
using System.Collections.Generic;
using System.Text;

namespace HK.PoyoWordBook.Data
{
    public interface ISQLite
    {
        SQLite.Net.SQLiteConnection GetConnection();
    }
}
