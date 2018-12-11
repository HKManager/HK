using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class DATA_Sale
    {
        public long? SALE_SN { set; get; }
        public string SALE_NAME { set; get; }
        public long? AC_SN { set; get; }
        public byte[] SALE_ITEMS { set; get; }
        
        public long? SALE_UPDATE_SN { set; get; }
        public DateTime? SALE_REGISTER_DT { set; get; }
        public string SALE_DESC { set; get; }
    }
}
