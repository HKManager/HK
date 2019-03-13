using HK.Collector.DataType;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.DB.SQLite
{
    public class 단어장쿼리
    {
        public static bool 단어장등록(단어장데이터 data)
        {
            try
            {
                var conn = Connection.GetConn();
                conn.Open();

                var query = Query.단어장.Insert;

                query = string.Format(query, data.WB_NAME, data.WB_CNT_UNIT, data.WB_CNT_WORD_UNIT, data.WB_CNT_WORD,
                    data.WAL_SN, data.WB_LOOPCNT, data.WB_INTERVAL, data.WB_REGISTERDT.ToString("yyyyMMddHHmmss"), data.WB_USEYN ? 0 : 1, data.WB_DESC);

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
