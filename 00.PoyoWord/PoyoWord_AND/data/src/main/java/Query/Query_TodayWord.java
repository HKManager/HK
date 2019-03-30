package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_TodayWord {

    /**
     SELECT
     tw.TW_SN
     , tw.TW_DATE
     , tw.TEST_YN
     , w.WORD_SN
     , w.WB_SN
     , w.WORD_WORD
     , w.WORD_MEAN
     , w.WORD_SPELLING
     , w.WORD_EXAM
     , w.WORD_EXAM_MEAN
     , w.WORD_LEVEL_CD
     , w.WORD_TYPE_CD
     , w.WORD_LEVEL_CD
     , w.WORD_IMAGE
     , w.WORD_SOUND
     , w.WORD_SOUND_FILE
     , w.WORD_IMPORTANT
     , w.WORD_LIKE
     , wal.WAL_SN
     , wal.WAL_NAME
     , wal.WAL_LOCS
     FROM todayword tw, word w, word_aud_loc wal
     WHERE tw.WORD_SN = w.WORD_SN
     AND tw.WAL_SN = wal.WAL_SN
     AND TW_DATE = strftime("%Y%m%d",'now','localtime')
     */
    @Multiline
    public static String GetList;

    /**
     SELECT COUNT(*) AS COUNT
     FROM todayword
     WHERE TW_DATE = strftime("%Y%m%d",'now','localtime')
     */
    @Multiline
    public static String GetTodayCount;

    /**
     INSERT INTO todayword
     (
     TW_DATE
     , WAL_SN
     , WORD_SN
     , TEST_YN
     )
     SELECT
     strftime("%Y%m%d",'now','localtime') AS TW_DATE
     , WAL_SN
     , WORD_SN
     , 0 AS TEST_YN
     FROM wordbook, word
     WHERE WB_TYPE_CD = '001'
     AND WB_LEVEL_CD = '001'
     AND WORD_SN = WORD_SN
     ORDER BY random()
     LIMIT 16
     */
    @Multiline
    public static String InsertRandomData;

    /**
     INSERT INTO todayword
     (
     TW_DATE
     , WAL_SN
     , WORD_SN
     , TEST_YN
     )
     SELECT
     strftime("%Y%m%d",'now','localtime') AS TW_DATE
     , wsb.WAL_SN
     , w.WORD_SN
     , 0 AS TEST_YN
     FROM wordstudybook wsb, mapping_wsb_w mwsb, word w
     WHERE mwsb.WSB_SN = mwsb.WSB_SN
     AND mwsb.WORD_SN = w.WORD_SN
     AND strftime("%Y%m%d",'now','localtime') BETWEEN wsb.WSB_FROMDT AND wsb.WSB_TODT
     */
    @Multiline
    public static String InsertStudyWordData;

    /**
     DELETE
     FROM
     todayword
     */
    @Multiline
    public static String DeleteData;

}
