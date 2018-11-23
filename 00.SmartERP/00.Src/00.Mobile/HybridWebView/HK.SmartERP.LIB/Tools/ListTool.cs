using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    public static class ListTool
    {
        public static List<List<T>> Split<T>(List<T> source, int cnt)
        {
            return source
                .Select((x, i) => new { Index = i, Value = x })
                .GroupBy(x => x.Index / cnt)
                .Select(x => x.Select(v => v.Value).ToList())
                .ToList();
        }
    }
}
