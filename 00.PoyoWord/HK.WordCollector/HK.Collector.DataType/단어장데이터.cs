﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.DataType
{
    public class 단어장데이터
    {
        public long WB_SN { set; get; }
        public string WB_NAME { set; get; }
        public string WB_TYPE_CD { set; get; }
        public string WB_LEVEL_CD { set; get; }
        public long WB_CNT_UNIT { set; get; }
        public long WB_CNT_WORD_UNIT { set; get; }
        public long WB_CNT_WORD { set; get; }
        public long WAL_SN { set; get; }
        public long WB_LOOPCNT { set; get; }
        public long WB_INTERVAL { set; get; }
        public DateTime WB_REGISTERDT { set; get; }
        public bool WB_USEYN { set; get; }
        public string WB_DESC { set; get; }
    }
}
