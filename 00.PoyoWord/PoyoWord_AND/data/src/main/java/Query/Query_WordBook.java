package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_WordBook {
    /**
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
     */
    @Multiline
    public static String GetList;
}
