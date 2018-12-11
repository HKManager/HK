using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class Query_매입
    {
        public const string GetList = @"
            SELECT 
	            BUY_SN
	            , BUY_NAME
	            , AC_SN
	            , BUY_ITEMS
	            , BUY_REGISTER_DT
	            , BUY_DESC
            FROM BUY
        ";

        public const string Insert = @"
            INSERT INTO
                buy
                (
                    BUY_NAME
                    , AC_SN
                    , BUY_ITEMS
                    , BUY_REGISTER_DT
                    , BUY_DESC
                )
                VALUES
                (
                    '{0}'
                    , '{1}'
                    , '{2}'
                    , '{3}'
                    , '{4}'
                )
        ";

        public const string Update = @"
            UPDATE buy
            SET    BUY_NAME = '{0}',
                   AC_SN = '{1}',
                   BUY_ITEMS = '{2}',
                   BUY_REGISTER_DT = '{3}',
                   BUY_DESC = '{4}'
            WHERE  BUY_SN = {5}
        ";


        public const string Delete = @"
            DELETE
            FROM BUY
            WHERE BUY_SN = {0}
        ";

        public const string UpdateAddPrice = @"
			UPDATE account
            SET    AC_PAY = (
                AC_PAY + {0}
            )
            WHERE  AC_SN = {1}
        ";

        public const string UpdateSubPrice = @"
			UPDATE account
            SET    AC_PAY = (
                AC_PAY - {0}
            )
            WHERE  AC_SN = {1}
        ";
    }
}
