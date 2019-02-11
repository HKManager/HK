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
     , WORD_LEVEL
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
}