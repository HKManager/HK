using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class DATA_Account
    {
        public long AC_SN { set; get; }

        public string AC_ID { set; get; }
        public string AC_TYPE_CODE { set; get; }
        public string AC_TYPE_NAME { set; get; }
        public string AC_NAME { set; get; }
        public string AC_OWNER { set; get; }
        public string AC_ADDRESS { set; get; }

        public string AC_MAN01 { set; get; }
        public string AC_PHONENUMBER01 { set; get; }
        public string AC_EMAIL01 { set; get; }

        public string AC_MAN02 { set; get; }
        public string AC_PHONENUMBER02 { set; get; }
        public string AC_EMAIL02 { set; get; }

        public double AC_PAY { set; get; }
        public double AC_LOT { set; get; }
        public double AC_LAT { set; get; }

        public long AC_UPDATE_SN { set; get; }
        public DateTime? AC_UPDATE_DATE { set; get; }
        public bool AC_USEYN { set; get; }
        public string AC_DESC { set; get; }
    }
}
