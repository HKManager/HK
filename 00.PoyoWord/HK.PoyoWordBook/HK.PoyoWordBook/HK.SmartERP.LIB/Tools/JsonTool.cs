using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    /// <summary>
    /// JSON 관련 도구
    /// </summary>
    public static class JsonTool
    {
        private static string MyName = "JsonTool";
        private static Newtonsoft.Json.JsonSerializerSettings _msSettings = new Newtonsoft.Json.JsonSerializerSettings() { DateFormatHandling = DateFormatHandling.MicrosoftDateFormat };

        /// <summary>
        /// JSON String으로부터 Generic T Type의 객체로 Deserialize
        /// </summary>
        /// <typeparam name="T">Deserialize할 Type</typeparam>
        /// <param name="jsonString">Deserialize할 JSON String</param>
        /// <returns>Deserialize 된 객체</returns>
        public static T Deserialize<T>(string jsonString) where T : class
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(jsonString);
            }
            catch (Exception ex)
            {
                //Log.Fatal(new LogMsg { Logger = MyName, Msg = "Deserialize Failed", Exception = ex });
                return null;
            }
        }

        /// <summary>
        /// JSON String으로부터 object Type의 객체로 Deserialize
        /// </summary>
        /// <param name="jsonString">Deserialize할 JSON String</param>
        /// <returns>Deserialize 된 객체</returns>
        public static object Deserialize(string jsonString)
        {
            try
            {
                return JsonConvert.DeserializeObject(jsonString);
            }
            catch (Exception ex)
            {
                //Log.Fatal(new LogMsg { Logger = MyName, Msg = "Deserialize Failed", Exception = ex });
                return null;
            }
        }

        /// <summary>
        /// 객체를 JSON으로 Serialize
        /// </summary>
        /// <param name="data">Serialize할 객체</param>
        /// <returns>Serialize된 JSON String</returns>
        public static string Serialize(object data, bool useMicrosoftFormat = false)
        {
            try
            {
                if (useMicrosoftFormat)
                {
                    var s = JsonConvert.SerializeObject(data, _msSettings);
                    return s;
                }
                else
                    return JsonConvert.SerializeObject(data);
            }
            catch (Exception ex)
            {
                //Log.Fatal(new LogMsg { Logger = MyName, Msg = "Deserialize Failed", Exception = ex });
                return null;
            }
        }

        /// <summary>
        /// JSON String에서 특정 이름 하위의 String을 Parsing
        /// </summary>
        /// <param name="json">원본 JSON String</param>
        /// <param name="name">Parsing할 이름</param>
        /// <returns>Parsing된 String</returns>
        public static string ParsePropery(string json, string name)
        {
            try
            {
                var root = JObject.Parse(json);
                var item = root[name];
                return item.ToString();
            }
            catch
            {
                return json;
            }
        }

        public static string RemovePropery(string json, string name)
        {
            try
            {
                var root = JObject.Parse(json);
                root.Remove(name);
                return root.ToString();
            }
            catch
            {
                return json;
            }
        }

        public static string AddProperty(string json, string name, object o)
        {
            try
            {
                var root = JObject.Parse(json);
                var jObject = JToken.FromObject(o);
                root.Add(name, jObject);
                return root.ToString();
            }
            catch
            {
                return json;
            }
        }

        /// <summary>
        /// JSON String에 줄바꿈, 들여쓰기 등의 Formatting을 적용
        /// </summary>
        /// <param name="json">원본 JSON String</param>
        /// <returns>Format된 JSON String</returns>
        public static string Formatting(string json)
        {
            return JToken.Parse(json).ToString();
            //return JObject.Parse(json).ToString();
        }

        public static string ConvertString(object o)
        {
            try
            {
                var s = Tools.JsonTool.Serialize(o);

                if (string.IsNullOrEmpty(s) || s.Length <= 1)
                    return s;

                if (s[0] == '\"' && s[s.Length - 1] == '\"')
                {
                    return s.Substring(1, s.Length - 2);
                }
                else
                    return s;
            }
            catch
            {
                return o.ToString();
            }
        }

        /// <summary>
        /// 객체를 Serialize하여 파일에 기록
        /// </summary>
        /// <param name="fileName">기록할 파일명</param>
        /// <param name="obj">Serialize할 객체</param>
        /// <returns>true/false</returns>
        public static bool Save(string fileName, object obj, bool formatting = false)
        {
            try
            {
                string s = JsonTool.Serialize(obj);
                s = JsonTool.Formatting(s);


                var sr = new StreamWriter(fileName);
                sr.Write(s);
                sr.Close();

                return true;
            }
            catch (Exception ex)
            {
                //Log.Fatal(new LogMsg { Logger = MyName, Msg = "Save Failed", Exception = ex });
                return false;
            }
        }

        /// <summary>
        /// 파일로부터 Json String을 읽어 객체로 Deserialize
        /// </summary>
        /// <typeparam name="T">객체의 Type</typeparam>
        /// <param name="fileName">읽을 파일명</param>
        /// <returns>Deserialize된 객체</returns>
        public static T Open<T>(string fileName) where T : class, new()
        {
            try
            {
                var sr = new StreamReader(fileName);
                string s = sr.ReadToEnd();
                sr.Close();

                return JsonTool.Deserialize<T>(s);
            }
            catch (Exception ex)
            {
                //Log.Fatal(new LogMsg { Logger = MyName, Msg = "Open Failed", Exception = ex });
                return null;
            }
        }
    }
}
