package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_Mapping_WB_W {

    /**
     INSERT INTO
     mapping_wb_w
     (
        WB_SN
        , WORD_SN
     )
     values
     (
        (
            SELECT MAX(WB_SN) AS MAX_SN
            FROM wordbook
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
     mapping_wb_w
     (
         WB_SN
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
    public static String InsertWB_SN;

}
