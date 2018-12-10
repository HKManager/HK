using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.Data
{
    public class DATA_Item
    {
        public long? ITEM_SN { set; get; }

        public string ITEM_CODE01 { set; get; }
        public string ITEM_CODE02 { set; get; }
        public string ITEM_CODE03 { set; get; }
        public string ITEM_NAME { set; get; }
        
        public long? ITEM_BOOKMARK { set; get; }

        public string ITEM_SIZE_CODE { set; get; }
        public string ITEM_STATUS_CODE { set; get; }
        public string ITEM_LEVEL_CODE { set; get; }
        public string ITEM_WEIGHT { set; get; }

        public double ITEM_COUNT { set; get; }
        public double ITEM_COUNT_BOX { set; get; }
        public double ITEM_COUNT_PALLET { set; get; }
        public double ITEM_PRICE_BUY { set; get; }
        public double ITEM_PRICE_SALE { set; get; }

        public DateTime? ITEM_REGISTE_DT { set; get; }
        public DateTime? ITEM_UPDATE_DT { set; get; }
        public bool ITEM_USEYN { set; get; }
        public string ITEM_DESC { set; get; }
    }
}
