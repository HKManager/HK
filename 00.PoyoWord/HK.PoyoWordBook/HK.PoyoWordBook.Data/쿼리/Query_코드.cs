using System;
using System.Collections.Generic;
using System.Text;

namespace HK.PoyoWordBook.Data
{
    public class Query_코드
    {
        public const string GetList = @"
            SELECT 
                cd1.CODE_001 CODE
                , cd1.CODE_001 CODE_001
                , '---' CODE_002
                , '---' CODE_003
                , cd1.CODE_NAME CODE_NAME
                , cd1.CODE_TYPE CODE_TYPE
                , cd1.CODE_SORT CODE_SORT
                , CASE cd1.CODE_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END USEYN
                , cd1.CODE_UPDATE_SN CODE_UPDATE_SN
                , cd1.CODE_UPDATE_DATE CODE_UPDATE_DATE
                , cd1.CODE_DESC CODE_DESC
            FROM CODE_001 cd1
            UNION ALL
            SELECT 
                cd2.CODE_002 CODE
                , cd2.CODE_001 CODE_001
                , cd2.CODE_002 CODE_002
                , '---' CODE_003
                , cd2.CODE_NAME CODE_NAME
                , cd2.CODE_TYPE CODE_TYPE
                , cd2.CODE_SORT CODE_SORT
                , CASE cd2.CODE_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END USEYN
                , cd2.CODE_UPDATE_SN CODE_UPDATE_SN
                , cd2.CODE_UPDATE_DATE CODE_UPDATE_DATE
                , cd2.CODE_DESC CODE_DESC
            FROM CODE_002 cd2
            UNION ALL
            SELECT
				cd3.CODE_003 CODE            
                , cd3.CODE_001 CODE_001
                , cd3.CODE_002 CODE_002
                , cd3.CODE_003 CODE_003
                , cd3.CODE_NAME CODE_NAME
                , cd3.CODE_TYPE CODE_TYPE
                , cd3.CODE_SORT CODE_SORT
                , CASE cd3.CODE_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END USEYN
                , cd3.CODE_UPDATE_SN CODE_UPDATE_SN
                , cd3.CODE_UPDATE_DATE CODE_UPDATE_DATE
                , cd3.CODE_DESC CODE_DESC
            FROM CODE_003 cd3
        ";
    }
}
