using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public static class HARDCODE
    {
        public static class 이벤트
        {
            public const string 전체조회 = "01";
            public const string 개별조회 = "02";
            public const string 등록 = "03";
            public const string 수정 = "04";
            public const string 삭제 = "05";
            public const string 화면호출 = "06";
        }

        public static class 화면
        {
            public const string 거래처 = "ACCOUNT";
            public const string 상품 = "ITEM";
            public const string 매입 = "BUY";
            public const string 매출 = "SALE";
        }

        public static class 명령문
        {
            public const string 표출 = "SHOW";
        }
    }

}
