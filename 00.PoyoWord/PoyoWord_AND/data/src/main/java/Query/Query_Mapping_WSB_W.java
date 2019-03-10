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
         (
             SELECT MAX(WSB_SN) AS MAX_SN
             FROM wordstudybook
         ),
         %s,
         %s
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
         %s,
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
