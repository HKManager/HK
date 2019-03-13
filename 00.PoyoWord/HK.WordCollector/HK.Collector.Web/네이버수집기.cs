using HK.Collector.DataType;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.Web
{
    public class 네이버수집기
    {
        private static 네이버수집기 _instance;

        public static 네이버수집기 GetInstance()
        {
            if (_instance == null)
                _instance = new 네이버수집기();

            return _instance;
        }

        public List<다음단어장> 예문수집기(string word, string tag = null)
        {
            string Url = "https://endic.naver.com/search_example.nhn?sLn=kr&query={0}";

            List<다음단어장> values = new List<다음단어장>();

            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load(string.Format(Url, word));

            HtmlNodeCollection nodeColExam = doc.DocumentNode.SelectNodes("//span");
            HtmlNodeCollection nodeColMean = doc.DocumentNode.SelectNodes("//a");

            //var abc = (t => abcd((List<string>)t.GetClasses()));

            int valueIndex = 0;

            foreach (var item in nodeColExam)
            {
                var exam = 예문찾기(item.GetClasses().ToList(), item);

                if(!string.IsNullOrEmpty(exam))
                {
                    values.Add(new 다음단어장
                    {
                        WORD_EXAM = exam
                    });
                }
            }

            foreach(var item in nodeColMean)
            {
                var mean = 뜻찾기(item.GetClasses().ToList(), item);

                if (!string.IsNullOrEmpty(mean))
                {
                    values[valueIndex].WORD_EXAM_MEAN = mean;
                    valueIndex++;
                }
            }

            return values.Where(t => !string.IsNullOrEmpty(t.WORD_EXAM) && !string.IsNullOrEmpty(t.WORD_EXAM_MEAN)).OrderBy(t => t.WORD_EXAM.Length).ToList();
        }
        
        private string 예문찾기(List<string> temp, HtmlNode item)
        {
            if(temp.Count <= 0)
            {
                return null;
            }

            if(temp[0].Equals("fnt_e09"))
            {
                return item.InnerText;
            } else
            {
                return null;
            }

        }

        private string 뜻찾기(List<string> temp, HtmlNode item)
        {
            if (temp.Count <= 0)
            {
                return null;
            }

            if (temp[0].Equals("N=a:xml.detail"))
            {
                return item.InnerText;
            } else
            {
                return null;
            }
        }
    }
}
