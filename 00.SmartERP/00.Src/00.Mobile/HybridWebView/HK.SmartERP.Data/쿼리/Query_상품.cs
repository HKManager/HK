using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class Query_상품
    {
        public const string GetList = @"
            SELECT 
	            ITEM_SN
	            , ITEM_NAME
	            , ITEM_COUNT
	            , ITEM_PRICE_BUY
	            , ITEM_PRICE_SALE
	            , ITEM_USEYN
	            , ITEM_DESC
            FROM ITEM
        ";

        public const string Insert = @"
            INSERT INTO
                item
                (
                    ITEM_NAME
                    , ITEM_COUNT
                    , ITEM_PRICE_BUY
                    , ITEM_PRICE_SALE
                    , ITEM_DESC
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
            UPDATE item
            SET    ITEM_NAME = '{0}',
                   ITEM_COUNT = '{1}',
                   ITEM_PRICE_BUY = '{2}',
                   ITEM_PRICE_SALE = '{3}',
                   ITEM_DESC = '{4}'
            WHERE  ITEM_SN = {5}
        ";


        public const string Delete = @"
            UPDATE item
            SET ITEM_USEYN = '0'
            WHERE AC_SN = {0}
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
