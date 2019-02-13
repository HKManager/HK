package Query;

import org.adrianwalker.multilinestring.Multiline;

public class Query_WordAudLoc {
    /**
     SELECT
     WAL_SN
     , WAL_NAME
     , WAL_LOCS
     , WAL_UPDATE_DT
     , CASE WAL_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WAL_USEYN
     , WAL_DESC
     FROM word_aud_loc;
     */
    @Multiline
    public static String GetList;
}
