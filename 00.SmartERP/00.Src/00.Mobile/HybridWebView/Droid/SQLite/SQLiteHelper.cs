using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using CustomRenderer.Droid;
using HK.SmartERP.Data;
using SQLite.Net;
using Xamarin.Forms;

[assembly: Dependency(typeof(SQLiteHelper))]
namespace CustomRenderer.Droid
{
    public class SQLiteHelper : ISQLite
    {
        SQLiteConnection ISQLite.GetConnection()
        {
            var plat = new SQLite.Net.Platform.XamarinAndroid.SQLitePlatformAndroid();


            string dbPath = string.Format("{0}/{1}/{2}", Android.OS.Environment.ExternalStorageDirectory, "SmartERP", "smarterp_farm.db");

            var conn = new SQLite.Net.SQLiteConnection(plat, dbPath);

            //string dbName = "smarterp_far.db";
            //string dbPath = Path.Combine(Android.OS.Environment.ExternalStorageDirectory.ToString(), dbName);

            //var conn = new SQLite.Net.SQLiteConnection(plat, dbPath);

            return conn;
        }
    }
}