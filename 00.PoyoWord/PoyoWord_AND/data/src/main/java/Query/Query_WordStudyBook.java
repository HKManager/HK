package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_WordStudyBook {

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
    public static String GetWordBookList;

    /**
     SELECT
     WSB_SN
     , WSB_NAME
     , WAL_SN
     , WSB_LEVEL_CD
     , WSB_CNT_UNIT
     , WSB_CNT_UNIT_WORD
     , WSB_REGISTERDT
     , WSB_FROMDT
     , WSB_TODT
     FROM wordstudybook
     */
    @Multiline
    public static String GetList;

    /**
     SELECT
     wsb.WSB_SN
     , wsb.WAL_SN
     , wsb.WSB_NAME
     , wsb.WSB_CNT_UNIT
     , wsb.WSB_CNT_UNIT_WORD
     , wsb.WSB_REGISTERDT
     , wsb.WSB_FROMDT
     , wsb.WSB_TODT
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
     , mwbw.MSWW_SN
     , mwbw.WORD_UNIT_SN
     FROM wordstudybook wsb, mapping_wsb_w mwbw, word w
     WHERE wb.wsb_sn = mwbw.wsb_sn
     AND w.word_sn = mwbw.word_sn
     AND wsb.wsb_sn = %s
     */
    @Multiline
    public static String GetData;

    /**
     INSERT INTO
     wordstudybook
     (
     WSB_NAME
     , WAL_SN
     , WSB_CNT_UNIT
     , WSB_CNT_UNIT_WORD
     , WSB_REGISTERDT
     , WSB_FROMDT
     , WSB_TODT
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
     )
     */
    @Multiline
    public static String Insert;

    /**
     UPDATE wordstudybook
     SET   
     WSB_NAME = '%s'
     , WAL_SN = '%s'
     , WSB_CNT_UNIT = '%s'
     , WSB_CNT_UNIT_WORD = '%s'
     , WSB_REGISTERDT = '%s'
     , WSB_FROMDT = '%s'
     , WSB_TODT = '%s'
     WHERE  WSB_SN = %s
     */
    @Multiline
    public static String Update;
}
