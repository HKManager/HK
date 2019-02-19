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

    /**
     SELECT
     WAL_SN
     , WAL_NAME
     , WAL_LOCS
     , WAL_UPDATE_DT
     , CASE WAL_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WAL_USEYN
     , WAL_DESC
     FROM word_aud_loc
     WHERE WAL_SN = %s
     */
    @Multiline
    public static String GetData;

    /**
     INSERT INTO
     word_aud_loc
     (
     WAL_NAME
     , WAL_LOCS
     , WAL_UPDATE_DT
     , WAL_USEYN
     , WAL_DESC
     )
     VALUES
     (
     '%s'
     , '%s'
     , '%s'
     , '%s'
     , '%s'
     )
     */
    @Multiline
    public static String Insert;

    /**
     UPDATE word_aud_loc
     SET   WAL_NAME = '%s'
     , WAL_LOCS = '%s'
     , WAL_UPDATE_DT = '%s'
     , WAL_USEYN= '%s'
     , WAL_DESC = '%s'
     WHERE  WAL_SN = %s
     */
    @Multiline
    public static String Update;
}
