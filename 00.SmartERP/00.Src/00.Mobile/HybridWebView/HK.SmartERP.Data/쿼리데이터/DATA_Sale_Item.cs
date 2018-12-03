using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class DATA_Buy_Item
    {
        public long SI_SN { set; get; }
        public long SALE_SN { set; get; }
        public long PRODUCT_SN { set; get; }

        public string SI_TYPE { set; get; }

        public double SI_PAY { set; get; }
        public double SI_TAX { set; get; }
        public double SI_PRICE { set; get; }
        public double SI_COUNT { set; get; }

        public double SI_BOX_COUNT { set; get; }
        public double SI_WEIGHT { set; get; }
        public double SI_PALLET_COUNT { set; get; }

        public DateTime SI_REGISTER_DT { set; get; }
    }
}
