using HK.SmartERP.LIB.Tools;
using SQLite.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.Data.쿼리
{
    public class 쿼리_거래처 : i쿼리
    {
        private static 쿼리_거래처 _instance;

        public static 쿼리_거래처 GetInstance()
        {
            if (_instance == null)
                _instance = new 쿼리_거래처();

            return _instance;
        }

        public string 조회(params object[] data)
        {
            var query = Query_거래처.GetList;

            // - 검색조건 만들기
            string strAccount_name = string.Empty;
            string type_code = data[0].ToString();
            string account_name = data[1].ToString();

            if (string.IsNullOrEmpty(type_code))
            {
                type_code = "null";
            }

            if (string.IsNullOrEmpty(account_name))
            {
                account_name = "null";
                strAccount_name = account_name;
            }
            else
            {
                strAccount_name = "'" + account_name + "'";
            }
            // - 검색조건 만들기

            query = string.Format(query, type_code, account_name, strAccount_name);

            var result = 연결자_Sqlite.DB연결자.Query<DATA_Account>(query).ToList();

            result = result.Where(t => t.AC_USEYN).ToList();

            return JsonTool.Serialize(result);
        }

        public bool 등록(object data)
        {
            try
            {
                DATA_Account account = (DATA_Account)data;

                var query = string.Format(Query_거래처.Insert, account.AC_NAME, account.AC_TYPE_CODE, account.AC_ADDRESS, account.AC_MAN01, account.AC_PHONENUMBER01, account.AC_EMAIL01, account.AC_PAY, account.AC_DESC);

                SQLiteCommand commnad = 연결자_Sqlite.DB연결자.CreateCommand(query);

                var result = commnad.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public bool 수정(object data)
        {
            try
            {
                DATA_Account account = (DATA_Account)data;

                var query = string.Format(Query_거래처.Update, account.AC_NAME, account.AC_TYPE_CODE, account.AC_ADDRESS, account.AC_MAN01, account.AC_PHONENUMBER01, account.AC_EMAIL01, account.AC_PAY, account.AC_DESC, account.AC_SN);

                SQLiteCommand commnad = 연결자_Sqlite.DB연결자.CreateCommand(query);

                var result = commnad.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public bool 삭제(object data)
        {
            try
            {
                DATA_Account account = (DATA_Account)data;

                var query = string.Format(Query_거래처.Delete, account.AC_SN);

                SQLiteCommand commnad = 연결자_Sqlite.DB연결자.CreateCommand(query);

                var result = commnad.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}
