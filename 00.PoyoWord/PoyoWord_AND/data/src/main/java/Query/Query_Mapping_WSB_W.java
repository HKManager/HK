package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_Mapping_WSB_W {

    /**
     INSERT INTO
     mapping_wsb_w
     (
     WSB_SN
     , WORD_SN
     )
     values
     (
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
     , WORD_SN
     )
     values
     (
     %s,
     (
     SELECT MAX(WORD_SN) MAX_SN
     FROM word
     )
     )
     */
    @Multiline
    public static String InsertWSB_SN;

}
