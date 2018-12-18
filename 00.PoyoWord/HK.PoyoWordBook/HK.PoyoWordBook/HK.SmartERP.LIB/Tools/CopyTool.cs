using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    public static class CopyTool
    {
        /// <summary>
        /// 객체를 새로운 객체로 Deep Copy 함
        /// </summary>
        /// <typeparam name="T">Deep Copy할 객체의 Type</typeparam>
        /// <param name="obj">Deep Copy할 객체</param>
        /// <returns>Deep Copy 된 객체</returns>
        public static T Copy<T>(T obj) where T : class, new()
        {
            if (obj == null)
                return null;

            return (T)Process(obj);
        }

        private static object Process(object obj)
        {
            if (obj == null)
                return null;

            Type type = obj.GetType();

            if (type.IsValueType || type == typeof(string))
            {
                return obj;
            }

            else if (type.IsArray)
            {
                var typeName = type.FullName.Replace("[]", string.Empty);
                Type elementType = Type.GetType(typeName);
                if (elementType == null)
                {
                    var assms = AppDomain.CurrentDomain.GetAssemblies();
                    foreach (var assm in assms)
                    {
                        elementType = assm.GetType(typeName);
                        if (elementType != null)
                            break;
                    }
                }

                var array = obj as Array;
                Array copied = Array.CreateInstance(elementType, array.Length);

                for (int i = 0; i < array.Length; i++)
                {
                    copied.SetValue(Process(array.GetValue(i)), i);
                }

                return Convert.ChangeType(copied, obj.GetType());
            }
            else if (type.IsClass)
            {
                object toret = Activator.CreateInstance(obj.GetType());
                FieldInfo[] fields = type.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

                foreach (FieldInfo field in fields)
                {
                    object fieldValue = field.GetValue(obj);
                    if (fieldValue == null)
                        continue;
                    field.SetValue(toret, Process(fieldValue));
                }
                return toret;
            }
            else
                return null;
        }

    }
}
