using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    public static class DateTimeTool
    {
        #region 기간별 검색 시 From ~ To 를 설정 한다.
        public static DateTime GetFromSecond(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second);
        }

        public static DateTime GetToSecond(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second);
        }

        public static DateTime GetFromMinute(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, 0);
        }

        public static DateTime GetToMinute(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, 59);
        }

        public static DateTime GetFromHour(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, date.Hour, 0, 0);
        }

        public static DateTime GetToHour(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, date.Hour, 59, 59);
        }

        public static DateTime GetFromDay(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
        }

        public static DateTime GetToDay(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 23, 59, 59);
        }

        public static DateTime GetFromWeek(DateTime date)
        {
            if (DateTime.Compare(date, new DateTime()) > 0)
                date = date.AddDays(-1 * (int)date.DayOfWeek);

            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
        }

        public static DateTime GetToWeek(DateTime date)
        {
            if (DateTime.Compare(date, new DateTime()) > 0)
                date = date.AddDays(6 - (int)date.DayOfWeek);

            return new DateTime(date.Year, date.Month, date.Day, 23, 59, 59);
        }

        public static DateTime GetFromMonth(DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1, 0, 0, 0);
        }

        public static DateTime GetToMonth(DateTime date)
        {
            return new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month), 23, 59, 59);
        }

        public static DateTime GetFromQuarter(DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1, 0, 0, 0);
        }

        public static DateTime GetToQuarter(DateTime date)
        {
            var month = (((date.Month - 1) / 3) + 1) * 3;
            return new DateTime(date.Year, month, DateTime.DaysInMonth(date.Year, month), 23, 59, 59);
        }

        public static DateTime GetFromYear(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }

        public static DateTime GetToYear(DateTime date)
        {
            return new DateTime(date.Year, 12, DateTime.DaysInMonth(date.Year, date.Month), 23, 59, 59);
        }
        #endregion

        // 해당 월이 몇 번째 주(week)인가를 반환한다.
        public static int GetWeekOfMonth(DateTime date, bool isMonth = false)
        {
            try
            {
                int days = 0;
                if (isMonth)
                    days = DateTime.DaysInMonth(date.Year, date.Month);
                else
                    days = date.Day;

                DateTime DateTemp = new DateTime(date.Year, date.Month, 1);

                int count = 0;
                for (int i = 1; i <= days; i++)
                {
                    if (DateTemp.DayOfWeek == DayOfWeek.Wednesday)
                        count++;
                    DateTemp = DateTemp.AddDays(1);
                }
                return count;
            }
            catch (Exception ex)
            { return 0; }
        }

        //public static bool SetPeriod(DateEdit dateFrom, DateEdit dateTo)
        //{
        //    try
        //    {
        //        if (dateFrom.EditValue == null && dateTo.EditValue == null)
        //        {
        //            return false;
        //        }

        //        if (dateFrom.EditValue == null)
        //        {
        //            dateFrom.EditValue = GetFromDay(dateTo.DateTime);
        //            dateTo.EditValue = GetToDay(dateTo.DateTime);
        //            return true;
        //        }

        //        if (dateTo.EditValue == null)
        //        {
        //            dateFrom.EditValue = GetFromDay(dateFrom.DateTime);
        //            dateTo.EditValue = GetToDay(dateFrom.DateTime);
        //            return true;
        //        }

        //        if (DateTime.Compare(dateFrom.DateTime, dateTo.DateTime) > 0)
        //        {
        //            var temp = dateFrom.DateTime;
        //            dateFrom.EditValue = dateTo.DateTime;
        //            dateTo.EditValue = temp;
        //            return true;
        //        }

        //        if (GetFromSecond(dateFrom.DateTime) == GetToSecond(dateTo.DateTime))
        //        {
        //            dateFrom.EditValue = GetFromDay(dateFrom.DateTime);
        //            dateTo.EditValue = GetToDay(dateFrom.DateTime);
        //            return true;
        //        }

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }
        //}

        public static Dictionary<string, int> GetFromToIndex(DateCategory category, DateTime from, DateTime to, bool isDefalut = true)
        {
            Dictionary<string, int> _result = new Dictionary<string, int>();

            int fromIndex = 0;
            int toIndex = 0;

            switch (category)
            {
                case DateCategory.YEAR:
                    fromIndex = from.Year;
                    toIndex = to.Year;
                    break;
                case DateCategory.MONTH:
                    if (isDefalut || (to.Year - from.Year > 0))
                    {
                        fromIndex = 1;
                        toIndex = 12;
                    }
                    else
                    {
                        fromIndex = from.Month;
                        toIndex = to.Month;
                    }
                    break;
                case DateCategory.DAY:
                    if (isDefalut)
                    {
                        fromIndex = 1;
                        toIndex = 31;
                    }
                    else
                    {
                        toIndex = (to - from).Days;
                    }
                    break;
                case DateCategory.WEEK:
                    fromIndex = 1;
                    toIndex = GetWeekOfMonth(to, true);
                    break;
                case DateCategory.HOUR:
                    if (isDefalut)
                    {
                        fromIndex = 0;
                        toIndex = 23;
                    }
                    else
                    {
                        fromIndex = from.Hour;
                        toIndex = to.Hour;
                    }
                    break;
                case DateCategory.WEEKDAY:
                    if (isDefalut)
                    {
                        fromIndex = 0;
                        toIndex = 6;
                    }
                    else
                    {
                        fromIndex = (int)from.DayOfWeek;
                        toIndex = (int)from.DayOfWeek;
                    }
                    break;
            }

            _result.Add("from", fromIndex);
            _result.Add("to", toIndex);

            return _result;
        }

        public static Dictionary<int, double> GetEmptyData(DateCategory category, DateTime from, DateTime to)
        {
            Dictionary<int, double> _result = new Dictionary<int, double>();

            var keys = GetFromToIndex(category, from, to);

            for (int i = keys.Values.FirstOrDefault(); i <= keys.Values.LastOrDefault(); i++)
            {
                _result.Add(i, 0.0);
            }

            return _result;
        }

        public class DateType
        {
            public DateCategory category { set; get; }
            public string name { set; get; }
        }

        public enum DateCategory
        {
            HOUR = 0,
            HOLIDAY = 1,
            WEEKDAY = 2,
            WEEK = 3,
            MONTH = 4,
            YEAR = 5,
            DAY = 6
        }
    }
}
