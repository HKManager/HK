using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using HtmlAgilityPack;
using System.Threading.Tasks;

namespace HK.Collector.Web
{
    public class 구글수집기
    {
        private static 구글수집기 _instance;

        public static 구글수집기 GetInstance()
        {
            if (_instance == null)
                _instance = new 구글수집기();

            return _instance;
        }

        public string 구글번역(string input, string languagePair)
        {
            string result = string.Empty;

            if (string.IsNullOrEmpty(input))
                return string.Empty;
            
            string url = String.Format("https://translate.google.co.kr/?hl={1}#view=home&op=translate&sl=auto&tl={1}&text={0}", input, languagePair);

            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load(url);

            HtmlNodeCollection nodeColExam = doc.DocumentNode.SelectNodes("//span");

            foreach(var item in nodeColExam)
            {
                var mean = 번역찾기(item.GetClasses().ToList(), item);

                if(item.InnerText.Equals("과일"))
                {

                }

                if (!string.IsNullOrEmpty(mean))
                {
                }
            }

            return result.Trim();
        }

        private string 번역찾기(List<string> temp, HtmlNode item)
        {
            if (temp.Count <= 0)
            {
                return null;
            }

            if (temp[0].Equals("tlid-translation translation"))
            {
                return item.InnerText;
            }
            else
            {
                return null;
            }
        }
    }
}
