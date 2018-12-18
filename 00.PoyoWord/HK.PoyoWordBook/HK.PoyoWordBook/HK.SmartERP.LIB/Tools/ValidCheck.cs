using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace HK.SmartERP.LIB.Tools
{
    public static class ValidCheck
    {
        public static string Empty(object o)
        {
            var emptyMsg = string.Empty;

            if (o is string)
                return string.IsNullOrEmpty(o as string) ? emptyMsg : string.Empty;
            else if (o is long)
                return ((long)o == 0) ? emptyMsg : string.Empty;
            else if (o is long?)
                return ((long?)o ?? 0) == 0 ? emptyMsg : string.Empty;
            else if (o is decimal)
                return ((decimal)o == 0) ? emptyMsg : string.Empty;
            else if (o is decimal?)
                return ((decimal?)o ?? 0) == 0 ? emptyMsg : string.Empty;
            else if (o is int)
                return ((int)o == 0) ? emptyMsg : string.Empty;
            else if (o is int?)
                return ((int?)o ?? 0) == 0 ? emptyMsg : string.Empty;
            else if (o is short)
                return ((short)o == 0) ? emptyMsg : string.Empty;
            else if (o is short?)
                return ((short?)o ?? 0) == 0 ? emptyMsg : string.Empty;
            else
                return (o == null) ? emptyMsg : string.Empty;
        }

        public static class Password
        {
            public static bool CheckEnglishNumber(string str)
            {
                if (string.IsNullOrEmpty(str))
                    return false;

                bool IsCheck = true;

                // Length Check
                Boolean iscount = false;
                if (str.Length > 7 && str.Length < 13)
                    iscount = true;

                // English Check
                Regex engRegex = new Regex(@"[a-zA-Z]");
                Boolean ismatch = engRegex.IsMatch(str);

                // Number Check
                Regex numRegex = new Regex(@"\d");
                Boolean ismatchNum = numRegex.IsMatch(str);

                //// Etc Check
                //Regex spcRegex = new Regex(@"[~!@\#$%^&*\()\=|\\/:;?""<>']");
                //Boolean ismatchSpc = spcRegex.IsMatch(str);

                if (!ismatch || !ismatchNum || !iscount)
                {
                    IsCheck = false;
                }

                return IsCheck;
            }
        }
    }
}
