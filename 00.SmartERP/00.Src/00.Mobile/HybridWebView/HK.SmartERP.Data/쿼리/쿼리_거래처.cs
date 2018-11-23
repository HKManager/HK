using SQLite.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.Data.쿼리
{
    public class 쿼리_거래처
    {
        private static 쿼리_거래처 _instance;

        public static 쿼리_거래처 GetInstance()
        {
            if (_instance == null)
                _instance = new 쿼리_거래처();

            return _instance;
        }

        public void 연결자설정(SQLiteConnection pConn)
        {

        }

        public List<DATA_Account> 조회(string type_code, string account_name)
        {
            var query = Query_거래처.GetList;

            // - 검색조건 만들기
            string strAccount_name = string.Empty;

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

            return result;
        }

        public bool 등록(DATA_Account data)
        {
            try
            {
                연결자_Sqlite.DB연결자.Insert(data);

                //var query = 출고거래처.Insert;

                //query = string.Format(query, data.AS_ID, data.AS_TYPE_CODE, data.AS_NAME, data.AS_OWNER, data.AS_ADDRESS, data.AS_MAN01, data.AS_PHONENUMBER01,
                //    data.AS_EMAIL01, data.AS_MAN02, data.AS_PHONENUMBER02, data.AS_EMAIL02, data.AS_LOT, data.AS_LAT, data.AS_UPDATE_SN, data.AS_UPDATE_DATE, data.AS_USEYN, data.AS_DESC, data.AS_PAY);

                //conn.Execute(query);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public bool 수정(DATA_Account data)
        {
            try
            {
                //var query = 출고거래처.Update;

                //query = string.Format(query, data.AS_ID, data.AS_TYPE_CODE, data.AS_NAME, data.AS_OWNER, data.AS_ADDRESS, data.AS_MAN01, data.AS_PHONENUMBER01,
                //    data.AS_EMAIL01, data.AS_MAN02, data.AS_PHONENUMBER02, data.AS_EMAIL02, data.AS_LOT, data.AS_LAT, data.AS_UPDATE_SN, data.AS_UPDATE_DATE, data.AS_USEYN, data.AS_DESC, data.AS_PAY, data.AS_SN);

                //conn.Execute(query);

                연결자_Sqlite.DB연결자.Update(data);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}
