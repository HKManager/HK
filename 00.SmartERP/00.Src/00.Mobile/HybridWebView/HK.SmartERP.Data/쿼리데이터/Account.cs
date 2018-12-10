using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class Account_PC
    {
        public long PC_SN { set; get; }
        public string PC_ID { set; get; }
        public long ACCOUNT_SN { set; get; }
        public string ACCOUNT_ID { set; get; }
        public string ACCOUNT_NAME { set; get; }
        public string ACCOUNT_USERNAME { set; get; }
        public string ACCOUNT_DB_NAME { set; get; }
        public long ACCOUNT_PC_COUNT { set; get; }
        public long ACCOUNT_MOBILE_COUNT { set; get; }
        public bool ACCOUNT_USEYN { set; get; }
        public DateTime? ACCOUNT_UPDATE_DATE { set; get; }
        public string ACCOUNT_PHONE { set; get; }
        public string ACCOUNT_CARNUM { set; get; }
        public string ACCOUNT_EMAIL { set; get; }
        public DateTime ACCOUNT_STARTDT { set; get; }
        public DateTime ACCOUNT_ENDDT { set; get; }
    }

    public class Account_MOBILE
    {
        public long MOBILE_SN { set; get; }
        public string MOBILE_ID { set; get; }
        public long ACCOUNT_SN { set; get; }
        public string ACCOUNT_ID { set; get; }
        public string ACCOUNT_NAME { set; get; }
        public string ACCOUNT_USERNAME { set; get; }
        public string ACCOUNT_DB_NAME { set; get; }
        public long ACCOUNT_PC_COUNT { set; get; }
        public long ACCOUNT_MOBILE_COUNT { set; get; }
        public bool ACCOUNT_USEYN { set; get; }
        public DateTime? ACCOUNT_UPDATE_DATE { set; get; }
        public string ACCOUNT_PHONE { set; get; }
        public string ACCOUNT_CARNUM { set; get; }
        public string ACCOUNT_EMAIL { set; get; }
        public DateTime ACCOUNT_STARTDT { set; get; }
        public DateTime ACCOUNT_ENDDT { set; get; }
    }
}
