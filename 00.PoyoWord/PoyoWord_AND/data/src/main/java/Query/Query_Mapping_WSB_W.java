package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_Mapping_WSB_W {

    /**
     INSERT INTO
     mapping_wsb_w
     (
     WSB_SN
     , WORD_UNIT_SN
     , WORD_SN
     )
     values
     (
     %s,
     (
     SELECT MAX(WSB_SN) AS MAX_SN
     FROM wordstudybook
     ),
     (
     SELECT MAX(WORD_SN) MAX_SN
     FROM word
     )
     )
     */
    @Multiline
    public static String Insert;

    /**
     INSERT INTO
     mapping_wsb_w
     (
     WSB_SN
     , WORD_UNIT_SN
     , WORD_SN
     )
     values
     (
     %s,
     %s,
     (
     SELECT MAX(WORD_SN) MAX_SN
     FROM word
     )
     )
     */
    @Multiline
    public static String InsertWSB_SN;

    /**
     UPDATE mapping_wsb_w
     SET   
     WORD_UNIT_SN = %s
     WHERE  WSB_SN = %s
     AND    WORD_SN = %s
     */
    @Multiline
    public static String Update;


    /**
     Delete
     FROM mapping_wsb_w
     WHERE  WSB_SN = %s
     AND    WORD_SN = %s
     */
    @Multiline
    public static String Delete;
}
