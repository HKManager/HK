using System;
using System.Collections.Generic;
using System.Text;

namespace HK.PoyoWordBook.Data
{
    public class DMS_CodeResponse
    {
        public string CODE { set; get; }
        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
        public string CODE_003 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public long CODE_UPDATE_SN { set; get; }
        public DateTime? CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    // CODE001 C/U/D
    public class Code001_InsertRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public long CODE_UPDATE_SN { set; get; }
        public string CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    public class Code001_UpdateRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public int CODE_UPDATE_SN { set; get; }
        public string CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    public class Code001_DeleteRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
    }

    // CODE002 C/U/D
    public class Code002_InsertRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public long CODE_UPDATE_SN { set; get; }
        public string CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    public class Code002_UpdateRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public long CODE_UPDATE_SN { set; get; }
        public string CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    public class Code002_DeleteRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
    }

    // CODE003 C/U/D
    public class Code003_InsertRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
        public string CODE_003 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public long CODE_UPDATE_SN { set; get; }
        public string CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    public class Code003_UpdateRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
        public string CODE_003 { set; get; }
        public string CODE_NAME { set; get; }
        public string CODE_TYPE { set; get; }
        public int CODE_SORT { set; get; }
        public bool CODE_USEYN { set; get; }
        public long CODE_UPDATE_SN { set; get; }
        public string CODE_UPDATE_DATE { set; get; }
        public string CODE_DESC { set; get; }
    }

    public class Code003_DeleteRequestData
    {
        public string DB_NAME { set; get; }

        public string CODE_001 { set; get; }
        public string CODE_002 { set; get; }
        public string CODE_003 { set; get; }
    }
}