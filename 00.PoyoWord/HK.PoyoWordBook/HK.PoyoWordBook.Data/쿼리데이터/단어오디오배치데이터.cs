using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.PoyoWordBook.Data
{
    public class 단어오디오배치데이터
    {
        public string DB_NAME { set; get; }

        public long WAL_SN { set; get; }
        public string WAL_NAME { set; get; }
        public string WAL_LOCS { set; get; }
        public DMS_CodeResponse[] WAL_LOCS_ITEMS { set; get; }
        public DateTime WAL_UPDATE_DT { set; get; }
        public bool WAL_USEYN { set; get; }
        public string WAL_DESC { set; get; }
    }
}
