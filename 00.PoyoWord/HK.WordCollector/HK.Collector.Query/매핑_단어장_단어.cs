using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.Query
{
    public class 매핑_단어장_단어
    {
        public const string Insert = @"
                INSERT INTO
                mapping_wb_w
                (
                    WB_SN
                    , WORD_SN
                )
                VALUES
                (
                    (SELECT MAX( WB_SN ) FROM wordbook)
                    , (SELECT MAX( WORD_SN ) FROM word)
                )
        ";
    }
}
