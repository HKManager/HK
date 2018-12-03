using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class DATA_Buy_Item
    {
        public long BI_SN { set; get; }
        public long BUY_SN { set; get; }
        public long PRODUCT_SN { set; get; }

        public string BI_TYPE { set; get; }

        public double BI_PAY { set; get; }
        public double BI_TAX { set; get; }
        public double BI_PRICE { set; get; }
        public double BI_COUNT { set; get; }

        public double BI_BOX_COUNT { set; get; }
        public double BI_WEIGHT { set; get; }
        public double BI_PALLET_COUNT { set; get; }

        public DateTime BI_REGISTER_DT { set; get; }
    }
}
