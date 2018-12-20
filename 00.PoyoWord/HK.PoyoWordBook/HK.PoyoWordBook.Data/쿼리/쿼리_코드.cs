using HK.SmartERP.LIB.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.PoyoWordBook.Data
{
    public class 쿼리_코드 : i쿼리
    {
        private static 쿼리_코드 _instance;

        public static 쿼리_코드 GetInstance()
        {
            if (_instance == null)
                _instance = new 쿼리_코드();

            return _instance;
        }

        public string 조회(params object[] data)
        {
            var query = Query_코드.GetList;

            var result = 연결자_Sqlite.DB연결자.Query<DMS_CodeResponse>(query).ToList();

            return JsonTool.Serialize(result);
        }

        public bool 등록(object data)
        {
            try
            {
                연결자_Sqlite.DB연결자.Insert(data);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public bool 삭제(object data)
        {
            throw new NotImplementedException();
        }

        public bool 수정(object data)
        {
            try
            {
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
