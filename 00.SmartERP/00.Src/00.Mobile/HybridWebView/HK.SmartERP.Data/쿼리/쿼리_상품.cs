using HK.SmartERP.LIB.Tools;
using SQLite.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.Data.쿼리
{
    public class 쿼리_상품 : i쿼리
    {
        private static 쿼리_상품 _instance;

        public static 쿼리_상품 GetInstance()
        {
            if (_instance == null)
                _instance = new 쿼리_상품();

            return _instance;
        }

        public string 조회(params object[] data)
        {
            var query = Query_상품.GetList;

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

            //query = string.Format(query, type_code, account_name, strAccount_name);

            var result = 연결자_Sqlite.DB연결자.Query<DATA_Item>(query).ToList();

            result = result.Where(t => t.ITEM_USEYN).ToList();

            return JsonTool.Serialize(result);
        }

        public bool 등록(object data)
        {
            try
            {
                DATA_Item item = (DATA_Item)data;

                var query = string.Format(Query_상품.Insert, item.ITEM_NAME, item.ITEM_COUNT, item.ITEM_PRICE_BUY, item.ITEM_PRICE_SALE, item.ITEM_DESC);

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
                DATA_Item item = (DATA_Item)data;

                var query = string.Format(Query_상품.Update, item.ITEM_NAME, item.ITEM_COUNT, item.ITEM_PRICE_BUY, item.ITEM_PRICE_SALE, item.ITEM_DESC, item.ITEM_SN);

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
                DATA_Item item = (DATA_Item)data;
                var query = string.Format(Query_상품.Delete, item.ITEM_SN);

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
