using HK.SmartERP.LIB.Tools;
using SQLite.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.Data.쿼리
{
    public class 쿼리_매입: i쿼리
    {
        private static 쿼리_매입 _instance;

        public static 쿼리_매입 GetInstance()
        {
            if (_instance == null)
                _instance = new 쿼리_매입();

            return _instance;
        }

        public string 조회(params object[] data)
        {
            var query = Query_매입.GetList;

            // - 검색조건 만들기
            //string strAccount_name = string.Empty;
            //string type_code = data[0].ToString();
            //string account_name = data[1].ToString();

            //if (string.IsNullOrEmpty(type_code))
            //{
            //    type_code = "null";
            //}

            //if (string.IsNullOrEmpty(account_name))
            //{
            //    account_name = "null";
            //    strAccount_name = account_name;
            //}
            //else
            //{
            //    strAccount_name = "'" + account_name + "'";
            //}
            // - 검색조건 만들기

            //query = string.Format(query, type_code, account_name, strAccount_name);

            var result = 연결자_Sqlite.DB연결자.Query<DATA_Buy>(query).ToList();

            //result = result.Where(t => t.ITEM_USEYN).ToList();

            return JsonTool.Serialize(result);
        }

        public bool 등록(object data)
        {
            try
            {
                DATA_Buy item = (DATA_Buy)data;

                var query = string.Format(Query_매입.Insert, item.BUY_NAME, item.AC_SN, item.BUY_ITEMS, item.BUY_REGISTER_DT, item.BUY_DESC);

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
                DATA_Buy item = (DATA_Buy)data;

                var query = string.Format(Query_매입.Update, item.BUY_NAME, item.AC_SN, item.BUY_ITEMS, item.BUY_REGISTER_DT, item.BUY_DESC, item.BUY_SN);

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
                DATA_Buy item = (DATA_Buy)data;
                var query = string.Format(Query_매입.Delete, item.BUY_SN);

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
