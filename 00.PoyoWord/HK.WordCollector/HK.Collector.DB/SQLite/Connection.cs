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
        public static string strConn = @"Data Source=E:\00.MyFolder\00.2017\01.ATMS\00.Project\00.ATMS\1711_DG_ATMS_3th\dg.atms.cop\COP\lib\ATMS.db";

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
