using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.Data
{
    public class 거래처관리자
    {
        private static 거래처관리자 _instance;

        public List<DATA_Account> _Accounts;

        public static 거래처관리자 GetInstance()
        {
            if (_instance == null)
                _instance = new 거래처관리자();

            return _instance;
        }

        public void Set거래처()
        {
            _Accounts = new List<DATA_Account>();

            _Accounts.Add(new DATA_Account
            {
                AC_SN = 0,
                AC_NAME = "금영상사",
                AC_MAN01 = "김금영",
                AC_TYPE_NAME = "입고"
            });
        }

        public List<DATA_Account> 조회_거래처()
        {
            return _Accounts;
        }

        public DATA_Account 조회_거래처(long sn)
        {
            var data = _Accounts.Where(t => t.AC_SN == sn).FirstOrDefault();

            return data;
        }
    }
}
