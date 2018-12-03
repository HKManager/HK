using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class DATA_Buy
    {
        public long BUY_SN { set; get; }
        public string BUY_NAME { set; get; }
        public long AC_SN { set; get; }
        public byte[] BUY_ITEMS { set; get; }
        
        public long BUY_UPDATE_SN { set; get; }
        public DateTime? BUY_REGISTER_DT { set; get; }
        public string BUY_DESC { set; get; }
    }
}
