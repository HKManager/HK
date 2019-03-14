using HK.Collector.DataType;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.DB.SQLite
{
    public class 단어쿼리
    {
        public static bool 단어등록(다음단어장 data)
        {
            try
            {
                var conn = Connection.GetConn();
                conn.Open();

                var query = Query.단어.Insert;

                query = string.Format(query, data.WORD_UNIT_SN, data.WORD_WORD, data.WORD_MEAN, data.WORD_SPELLING, data.WORD_SOUND
                        , data.WORD_SOUND_FILE, data.WORD_EXAM, data.WORD_EXAM_MEAN, data.WORD_TYPE_CD, data.WORD_LEVEL_CD, data.WORD_IMPORTANT, data.WORD_LEARNYN ? 0 : 1
                        , data.WORD_IMAGE, data.WORD_LIKE, data.WORD_USEYN ? 0 : 1);

                SQLiteCommand cmd = new SQLiteCommand(query, conn);

                cmd.ExecuteNonQuery();



                //query = Query.매핑_단어장_단어.Insert;
                //SQLiteCommand cmdMapping = new SQLiteCommand(query, conn);
                //cmdMapping.ExecuteNonQuery();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
