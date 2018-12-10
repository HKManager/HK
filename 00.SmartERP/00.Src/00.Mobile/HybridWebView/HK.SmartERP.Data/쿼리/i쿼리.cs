using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    interface i쿼리
    {
        string 조회 (params object[] data);
        bool 등록(object data);
        bool 수정(object data);
        bool 삭제(object data);
    }
}
