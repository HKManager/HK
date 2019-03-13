using HK.Collector.DataType;
using HK.Collector.DB.SQLite;
using HK.Collector.Web;
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

        private List<다음단어장> 단어리스트 = new List<다음단어장>();

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
            var name = filePath.Split('\\').LastOrDefault();

            name = name.Replace(".xls", "");

            단어장쿼리.단어장등록(new 단어장데이터
            {
                WB_NAME = name,
                WB_REGISTERDT = DateTime.Now,
                
            });

            var excel = new LinqToExcel.ExcelQueryFactory(filePath);
            aliData = (from t in excel.Worksheet<다음단어장>(0) select t).ToList();

            //foreach (var item in aliData)
            //{
            //    // - 예제만들기
            //    var examList = 네이버수집기.GetInstance().예문수집기(item.단어);
            //    var exam = examList.FirstOrDefault();

            //    if (exam == null)
            //        continue;

            //    item.WORD_EXAM = exam.WORD_EXAM;
            //    item.WORD_EXAM_MEAN = exam.WORD_EXAM_MEAN;

            //    // - 스팰링 만들기
            //    var spelling = Get스팰링(item.단어);
            //    item.WORD_SPELLING = spelling;

            //    단어리스트.Add(item);
            //}
        }

        private string Get스팰링(string 단어)
        {
            var SPELLING_TRIM = 단어.Trim();
            SPELLING_TRIM = SPELLING_TRIM.ToUpper();
            var SPELLING_List = SPELLING_TRIM.ToList();

            string SPELLING = string.Empty;

            foreach (var ch in SPELLING_List)
            {
                SPELLING += string.Format("{0}-", ch);
            }

            SPELLING = SPELLING.Remove(SPELLING.Length - 1, 1);

            return SPELLING;
        }
    }
}
