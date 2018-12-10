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

            string result = string.Empty;

            switch (이벤트.handle)
            {
                case HARDCODE.이벤트.전체조회:
                    switch(이벤트.view)
                    {
                        case HARDCODE.화면.거래처:
                            이벤트.data = 쿼리_거래처.GetInstance().조회(string.Empty, string.Empty);
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.상품:
                            이벤트.data = 쿼리_상품.GetInstance().조회(string.Empty, string.Empty);
                            break;
                        case HARDCODE.화면.매입:
                            break;
                        case HARDCODE.화면.매출:
                            break;
                    }
                    break;
                case HARDCODE.이벤트.개별조회:
                    break;
                case HARDCODE.이벤트.등록:
                    switch(이벤트.view)
                    {
                        case HARDCODE.화면.거래처:
                            var 거래처데이터 = JsonTool.Deserialize<DATA_Account>(이벤트.data);
                            거래처데이터.AC_USEYN = true;
                            이벤트.data = 쿼리_거래처.GetInstance().등록(거래처데이터).ToString();
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.상품:
                            var 상품데이터 = JsonTool.Deserialize<DATA_Item>(이벤트.data);
                            상품데이터.ITE_USEYN = true;
                            이벤트.data = 쿼리_상품.GetInstance().등록(상품데이터).ToString();
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.매입:
                            break;
                        case HARDCODE.화면.매출:
                            break;
                    }
                    break;
                case HARDCODE.이벤트.수정:
                    switch(이벤트.view)
                    {
                        case HARDCODE.화면.거래처:
                            var 거래처데이터 = JsonTool.Deserialize<DATA_Account>(이벤트.data);
                            이벤트.data = 쿼리_거래처.GetInstance().수정(거래처데이터).ToString();
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.상품:
                            var 상품데이터 = JsonTool.Deserialize<DATA_Item>(이벤트.data);
                            상품데이터.ITE_USEYN = true;
                            이벤트.data = 쿼리_상품.GetInstance().수정(상품데이터).ToString();
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.매입:
                            break;
                        case HARDCODE.화면.매출:
                            break;
                    }
                    break;
                case HARDCODE.이벤트.삭제:
                    switch(이벤트.view)
                    {
                        case HARDCODE.화면.거래처:
                            var 거래처데이터 = JsonTool.Deserialize<DATA_Account>(이벤트.data);
                            이벤트.data = 쿼리_거래처.GetInstance().삭제(거래처데이터).ToString();
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.상품:
                            var 상품데이터 = JsonTool.Deserialize<DATA_Item>(이벤트.data);
                            상품데이터.ITE_USEYN = true;
                            이벤트.data = 쿼리_상품.GetInstance().삭제(상품데이터).ToString();
                            result = JsonTool.Serialize(이벤트);
                            break;
                        case HARDCODE.화면.매입:
                            break;
                        case HARDCODE.화면.매출:
                            break;
                    }
                    break;
                case HARDCODE.이벤트.화면호출:
                    result = data;
                    break;
            }

            return result;
        }
    }
}
