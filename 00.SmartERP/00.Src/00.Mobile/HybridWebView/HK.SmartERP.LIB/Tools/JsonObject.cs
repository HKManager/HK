using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    public abstract class JsonObject
    {
        public string ToJson(bool formatting = true)
        {
            var json = JsonTool.Serialize(this);

            if (formatting)
                return JsonTool.Formatting(json);
            else
                return json;
        }

        public bool ToJsonFile(string fileName, bool formatting = true)
        {
            return JsonTool.Save(fileName, this, formatting);
        }

        public static T Parse<T>(string json) where T : class
        {
            return JsonTool.Deserialize<T>(json);
        }

        public static T ParseFromFile<T>(string fileName) where T : class, new()
        {
            return JsonTool.Open<T>(fileName);
        }
    }
}
