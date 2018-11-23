using HK.SmartERP.Data.쿼리;
using HK.SmartERP.LIB.Tools;
using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class 이벤트처리기
    {
        public static string 이벤트처리(string data)
        {
            var 이벤트 = JsonTool.Deserialize<이벤트데이터>(data);

            switch(이벤트.handle)
            {
                case HARDCODE.이벤트.전체조회:
                    switch(이벤트.view)
                    {

                    }


                    쿼리_거래처.GetInstance().조회(string.Empty, string.Empty);
                    break;
                case HARDCODE.이벤트.개별조회:
                    break;
                case HARDCODE.이벤트.등록:
                    break;
                case HARDCODE.이벤트.수정:
                    break;
                case HARDCODE.이벤트.삭제:
                    break;
            }

            return string.Empty;
        }
    }
}
