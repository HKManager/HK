using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.DB.SQLite
{
    public class 매핑_단어장_단어쿼리
    {
        public static bool 매핑_단어장_단어등록()
        {
            try
            {
                var conn = Connection.GetConn();
                conn.Open();

                var query = Query.매핑_단어장_단어.Insert;

                SQLiteCommand cmd = new SQLiteCommand(query, conn);

                cmd.ExecuteNonQuery();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
