using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.DB.SQLite
{
    public class Connection
    {
        public static string strConn = @"Data Source={0}";

        public static SQLiteConnection GetConn()
        {
            SQLiteConnection conn = new SQLiteConnection(strConn);

            //conn.Open();
            //string sql = "INSERT INTO member VALUES (100, 'Tom')";
            //SQLiteCommand cmd = new SQLiteCommand(sql, conn);
            //cmd.ExecuteNonQuery();

            //cmd.CommandText = "DELETE FROM member WHERE Id=1";
            //cmd.ExecuteNonQuery();

            return conn;
        }
    }
}
