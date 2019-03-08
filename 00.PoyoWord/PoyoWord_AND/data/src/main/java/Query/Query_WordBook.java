package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_WordBook {
    /**
     SELECT
     WB_SN
     , WB_NAME
     , WB_LEVEL_CD
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
     wb.WB_SN
     , wb.WB_NAME
     , wb.WB_LEVEL_CD
     , wb.WB_CNT_UNIT
     , wb.WB_CNT_WORD_UNIT
     , wb.WB_CNT_WORD
     , wb.WAL_SN
     , wb.WB_LOOPCNT
     , wb.WB_INTERVAL
     , wb.WB_REGISTERDT
     , wb.WB_USEYN
     , wb.WB_DESC
     , w.WORD_SN
     , w.WORD_UNIT_SN
     , w.WORD_WORD
     , w.WORD_MEAN
     , w.WORD_SPELLING
     , w.WORD_SOUND
     , w.WORD_SOUND_FILE
     , w.WORD_EXAM
     , w.WORD_EXAM_MEAN
     , w.WORD_TYPE_CD
     , w.WORD_LEVEL_CD
     , w.WORD_IMPORTANT
     , w.WORD_LEARNYN
     , w.WORD_IMAGE
     , w.WORD_LIKE
     , w.WORD_USEYN
     , mwbw.MWW_SN
     FROM wordbook wb, mapping_wb_w mwbw, word w
     WHERE wb.wb_sn = mwbw.wb_sn
     AND w.word_sn = mwbw.word_sn
     AND wb.wb_sn = %s
     */
    @Multiline
    public static String GetData;

    /**
     SELECT
     wb.WB_SN
     , wb.WB_NAME
     , wb.WB_LEVEL_CD
     , wb.WB_CNT_UNIT
     , wb.WB_CNT_WORD_UNIT
     , wb.WB_CNT_WORD
     , wb.WAL_SN
     , wb.WB_LOOPCNT
     , wb.WB_INTERVAL
     , wb.WB_REGISTERDT
     , wb.WB_USEYN
     , wb.WB_DESC
     , w.WORD_SN
     , w.WORD_UNIT_SN
     , w.WORD_WORD
     , w.WORD_MEAN
     , w.WORD_SPELLING
     , w.WORD_SOUND
     , w.WORD_SOUND_FILE
     , w.WORD_EXAM
     , w.WORD_EXAM_MEAN
     , w.WORD_TYPE_CD
     , w.WORD_LEVEL_CD
     , w.WORD_IMPORTANT
     , w.WORD_LEARNYN
     , w.WORD_IMAGE
     , w.WORD_LIKE
     , w.WORD_USEYN
     , mwbw.MWW_SN
     FROM wordbook wb, mapping_wb_w mwbw, word w
     WHERE wb.wb_sn = mwbw.wb_sn
     AND w.word_sn = mwbw.word_sn
     */
    @Multiline
    public static String GetDataList;

    /**
     INSERT INTO
     wordbook
     (
     WB_NAME
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
     , '%s'
     )
     */
    @Multiline
    public static String Insert;

    /**
     UPDATE wordbook
     SET   
     WB_NAME = '%s'
     , WB_LEVEL_CD = '%s'
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
