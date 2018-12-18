using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace HK.SmartERP.LIB.Tools
{
    public static class XmlTool
    {
        public static bool Save<T>(T obj, string fileName)
        {
            try
            {
                var xml = new XmlSerializer(typeof(T));

                using (var w = new StreamWriter(fileName))
                {
                    xml.Serialize(w, obj);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static T Load<T>(string fileName) where T : class
        {
            try
            {
                var xml = new XmlSerializer(typeof(T));
                using (var reader = new StreamReader(fileName))
                {
                    object obj = xml.Deserialize(reader);
                    T data = (T)obj;
                    return data;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
