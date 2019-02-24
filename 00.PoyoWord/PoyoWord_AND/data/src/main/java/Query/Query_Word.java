package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_Word {
    /**
     SELECT
     WORD_SN
     , WB_SN
     , WORD_UNIT_SN
     , WORD_WORD
     , WORD_MEAN
     , WORD_SPELLING
     , WORD_SOUND
     , WORD_SOUND_FILE
     , WORD_EXAM
     , WORD_EXAM_MEAN
     , WORD_TYPE_CD
     , WORD_LEVEL_CD
     , WORD_IMPORTANT
     , CASE WORD_LEARNYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WORD_LEARNYN
     , WORD_IMAGE
     , WORD_LIKE
     , CASE WORD_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WORD_USEYN
     FROM word
     WHERE WB_SN = %s
     AND WORD_USEYN = 0
     */
    @Multiline
    public static String GetList;

    /**
     SELECT
     WORD_SN
     , WB_SN
     , WORD_UNIT_SN
     , WORD_WORD
     , WORD_MEAN
     , WORD_SPELLING
     , WORD_SOUND
     , WORD_SOUND_FILE
     , WORD_EXAM
     , WORD_EXAM_MEAN
     , WORD_TYPE_CD
     , WORD_LEVEL_CD
     , WORD_IMPORTANT
     , CASE WORD_LEARNYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WORD_LEARNYN
     , WORD_IMAGE
     , WORD_LIKE
     , CASE WORD_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WORD_USEYN
     FROM word
     WHERE WORD_SN = %s
     AND WORD_USEYN = 0
     */
    @Multiline
    public static String GetData;

    /**
     INSERT INTO
     word
     (
     WORD_UNIT_SN
     , WORD_WORD
     , WORD_MEAN
     , WORD_SPELLING
     , WORD_SOUND
     , WORD_SOUND_FILE
     , WORD_EXAM
     , WORD_EXAM_MEAN
     , WORD_TYPE_CD
     , WORD_LEVEL_CD
     , WORD_IMPORTANT
     , WORD_LEARNYN
     , WORD_IMAGE
     , WORD_LIKE
     , WORD_USEYN
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
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     )
     */
    @Multiline
    public static String Insert;

    /**
     UPDATE word
     SET
     WORD_UNIT_SN = '%s'
     , WORD_WORD = '%s'
     , WORD_MEAN= '%s'
     , WORD_SPELLING = '%s'
     , WORD_SOUND = '%s'
     , WORD_SOUND_FILE = '%s'
     , WORD_EXAM = '%s'
     , WORD_EXAM_MEAN = '%s'
     , WORD_TYPE_CD = '%s'
     , WORD_LEVEL_CD = '%s'
     , WORD_IMPORTANT = '%s'
     , WORD_LEARNYN= '%s'
     , WORD_IMAGE = '%s'
     , WORD_LIKE = '%s'
     , WORD_USEYN = '%s'
     WHERE  WORD_SN = %s
     */
    @Multiline
    public static String Update;
}