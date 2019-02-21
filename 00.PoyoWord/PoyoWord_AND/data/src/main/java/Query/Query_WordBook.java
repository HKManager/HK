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
     WHERE WB_SN = $s
     */
    @Multiline
    public static String GetData;

    /**
     INSERT INTO
     wordbook
     (
     WB_NAME
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
     '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     )
     */
    @Multiline
    public static String Insert;

    /**
     UPDATE wordbook
     SET   
     WB_NAME = '%s'
     , WB_CNT_UNIT = '%s'
     , WB_CNT_WORD_UNIT = '%s'
     , WB_CNT_WORD = '%s'
     , WAL_SN = '%s'
     , WB_LOOPCNT = '%s'
     , WB_INTERVAL = '%s'
     , WB_REGISTERDT = '%s'
     , WB_USEYN= '%s'
     , WB_DESC = '%s'
     WHERE  WB_SN = %s
     */
    @Multiline
    public static String Update;
}
