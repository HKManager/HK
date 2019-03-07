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
     wsb.WB_SN
     , wsb.WB_NAME
     , wsb.WB_LEVEL_CD
     , wsb.WB_CNT_UNIT
     , wsb.WB_CNT_WORD_UNIT
     , wsb.WB_CNT_WORD
     , wsb.WAL_SN
     , wsb.WB_LOOPCNT
     , wsb.WB_INTERVAL
     , wsb.WB_REGISTERDT
     , wsb.WB_USEYN
     , wsb.WB_DESC
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
     FROM wordbook wsb, mapping_wsb_w mwbw, word w
     WHERE wb.wsb_sn = mwbw.wsb_sn
     AND w.word_sn = mwbw.word_sn
     AND wsb.wsb_sn = %s
     */
    @Multiline
    public static String GetData;
}
