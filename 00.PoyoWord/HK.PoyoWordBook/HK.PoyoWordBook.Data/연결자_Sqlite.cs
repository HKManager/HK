using SQLite.Net;
using System;
using System.Collections.Generic;
using System.Text;

namespace HK.PoyoWordBook.Data
{
    public class 연결자_Sqlite
    {
        public static SQLiteConnection DB연결자
        {
            set; get;
        }
    }
}
