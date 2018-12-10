using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class Query_거래처
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
                account
                (
                    AC_ID
                    , AC_TYPE_CODE
                    , AC_NAME
                    , AC_OWNER
                    , AC_ADDRESS
                    , AC_MAN01
                    , AC_PHONENUMBER01
                    , AC_EMAIL01
                    , AC_MAN02
                    , AC_PHONENUMBER02
                    , AC_EMAIL02
                    , AC_LOT
                    , AC_LAT
                    , AC_UPDATE_SN
                    , AC_UPDATE_DATE
                    , AC_USEYN
                    , AC_DESC
                    , AC_PAY
                )
                VALUES
                (
                    '{0}'
                    , '{1}'
                    , '{2}'
                    , '{3}'
                    , '{4}'
                    , '{5}'
                    , '{6}'
                    , '{7}'
                    , '{8}'
                    , '{9}'
                    , '{10}'
                    , '{11}'
                    , '{12}'
                    , '{13}'
                    , {14}
                    , '{15}'
                    , '{16}'
                    , '{17}'
                )
        ";

        public const string Update = @"
            UPDATE account
            SET    AC_ID = '{0}',
                   AC_TYPE_CODE = '{1}',
                   AC_NAME = '{2}',
                   AC_OWNER = '{3}',
                   AC_ADDRESS = '{4}',
                   AC_MAN01 = '{5}',
                   AC_PHONENUMBER01 = '{6}',
                   AC_EMAIL01 = '{7}',
                   AC_MAN02 = '{8}',
                   AC_PHONENUMBER02 = '{9}',
                   AC_EMAIL02 = '{10}',
                   AC_LOT = '{11}',
                   AC_LAT = '{12}',
                   AC_UPDATE_SN = {13},
                   AC_UPDATE_DATE = '{14}',
                   AC_USEYN = '{15}',
                   AC_DESC = '{16}',
                   AC_PAY = '{17}'
            WHERE  AC_SN = {18}
        ";


        public const string Delete = @"
            UPDATE account
            SET AC_USEYN = '0'
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
