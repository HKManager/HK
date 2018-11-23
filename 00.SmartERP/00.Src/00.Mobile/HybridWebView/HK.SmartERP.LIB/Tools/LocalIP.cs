using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace HK.SmartERP.LIB.Tools
{
    public static class LocalIP
    {
        public static string GetLocalIPv4()
        {
            Regex regex = new Regex(@"^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$");

            foreach (System.Net.IPAddress ip in System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName()).AddressList)
            {
                if (regex.IsMatch(ip.ToString()))
                {
                    return ip.ToString();
                }
            }

            return null;
        }
    }
}
