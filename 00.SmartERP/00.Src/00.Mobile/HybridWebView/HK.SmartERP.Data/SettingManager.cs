using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HK.SmartERP.Data
{
    public class SettingManager
    {
        public static Account_PC MYACCOUNT = new Account_PC();

        public static bool Load(string dbname, string pc_id, string date)
        {
            //Task.Run(async () => await GetList(dbname, pc_id, date)).Wait();

            return true;
        }

        //private static async Task GetList(string dbname, string pc_id, string date)
        //{
        //    try
        //    {
        //        var result = await MyAccount.GetAccountPC(dbname, pc_id, date);

        //        MYACCOUNT = result;
        //    }
        //    catch (Exception ex)
        //    {
        //        //Log.Error(new LogMsg { MethodName = "Code", Msg = "Service Failed.", Exception = ex });
        //    }
        //}
    }
}
