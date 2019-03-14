using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.Query
{
    public class 단어장
    {
        public const string GetList = @"
            SELECT
	              WB_SN
                , WB_NAME
                , WB_CNT_UNIT
                , WB_CNT_WORD_UNIT
                , WB_CNT_WORD
                , WAL_SN
                , WB_LOOPCNT
                , WB_INTERVAL
                , WB_REGISTERDT
                , CASE WB_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WB_USEYN
                , WB_DESC
            FROM wordbook
        ";

        public const string GetInfo = @"
                SELECT 
	                WB_SN
                    , WAL_SN
	                , WB_INTERVAL
                    , WB_LOOPCNT
                FROM wordbook
                WHERE WB_SN={0}
        ";

        public const string GetMaxKey = @"
            SELECT 
	            MAX(WB_SN) MaxKey
            FROM wordbook;
        ";

        public const string Insert = @"
            INSERT INTO
                wordbook
                (
                    WB_NAME
                    , WB_TYPE_CD
                    , WB_LEVEL_CD
                    , WB_CNT_UNIT
                    , WB_CNT_WORD_UNIT
                    , WB_CNT_WORD
                    , WAL_SN
                    , WB_LOOPCNT
                    , WB_INTERVAL
                    , WB_REGISTERDT
                    , WB_USEYN
                    , WB_DESC
                )
                VALUES
                (
                    '{0}'
                    , '{1}'
                    , '{2}'
                    , '{3}'
                    , '{4}'
                    , '{5}'
                    , '{6}'
                    , '{7}'
                    , '{8}'
                    , '{9}'
                    , '{10}'
                    , '{11}'
                )
        ";


        public const string Update = @"
            UPDATE wordbook
            SET   WB_NAME = '{0}'
                   , WB_CNT_UNIT = '{1}'
                   , WB_CNT_WORD_UNIT = '{2}'
                   , WB_CNT_WORD = '{3}'
                   , WAL_SN = '{4}'
                   , WB_LOOPCNT = '{5}'
                   , WB_INTERVAL = '{6}'
                   , WB_REGISTERDT = '{7}'
                   , WB_USEYN = '{8}'
                   , WB_DESC = '{9}'
            WHERE  WB_SN = {10}
        ";
    }
}
