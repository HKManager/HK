using HK.Collector.DB.SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HK.WordCollector
{
    static class Program
    {
        /// <summary>
        /// 해당 응용 프로그램의 주 진입점입니다.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            Connection.strConn = string.Format(Connection.strConn, Properties.Settings.Default.DBAddress);

            Application.Run(new frmMain());
        }
    }
}
