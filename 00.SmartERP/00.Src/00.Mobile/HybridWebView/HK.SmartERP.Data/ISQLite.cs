using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public interface ISQLite
    {
        SQLite.Net.SQLiteConnection GetConnection();
    }
}
