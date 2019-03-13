using HK.Collector.DataType;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.Excel
{
    public class 다음단어장수집기
    {
        private List<다음단어장> aliData;

        private static 다음단어장수집기 _instance;

        public static 다음단어장수집기 GetInstance()
        {
            if (_instance == null)
                _instance = new 다음단어장수집기();

            return _instance;
        }

        public void 단어수집시작(string folderPath)
        {
            string[] array = Directory.GetFiles(folderPath, "*.xls");

            foreach(var item in array)
            {
                단어수집(item);
            }
        }

        public void 단어수집(string filePath)
        {
            var excel = new LinqToExcel.ExcelQueryFactory(filePath);
            aliData = (from t in excel.Worksheet<다음단어장>(0) select t).ToList();

            foreach (var item in aliData)
            {
                
            }
        }
    }
}
