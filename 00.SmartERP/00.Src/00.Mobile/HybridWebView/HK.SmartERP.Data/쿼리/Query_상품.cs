using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class Query_상품
    {
        public const string GetList = @"
            SELECT 
	              ac.AC_SN AC_SN
	            , ac.AC_ID AC_ID
	            , ac.AC_TYPE_CODE AC_TYPE_CODE
                , null AC_TYPE_NAME
	            , ac.AC_NAME AC_NAME
                , ac.AC_OWNER AC_OWNER
	            , ac.AC_ADDRESS AC_ADDRESS
	            , ac.AC_MAN01 AC_MAN01
	            , ac.AC_PHONENUMBER01 AC_PHONENUMBER01
                , ac.AC_EMAIL01 AC_EMAIL01
	            , ac.AC_MAN02 AC_MAN02
	            , ac.AC_PHONENUMBER02 AC_PHONENUMBER02
	            , ac.AC_EMAIL02 AC_EMAIL02
                , ac.AC_PAY AC_PAY
                , ac.AC_LOT AC_LOT
	            , ac.AC_LAT AC_LAT
	            , ac.AC_UPDATE_SN AC_UPDATE_SN
	            , ac.AC_UPDATE_DATE AC_UPDATE_DATE
	            , ac.AC_USEYN AC_USEYN
	            , ac.AC_DESC AC_DESC
            FROM account ac
            WHERE (ac.AC_TYPE_CODE = '{0}'  OR {0} IS NULL)
            AND (ac.AC_NAME LIKE '%' || '{1}' || '%' OR {2} IS NULL)
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
