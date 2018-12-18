using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    public class DataTableTool
    {
        private static PropertyDescriptorCollection properties;

        public static PropertyDescriptorCollection Properties
        {
            get { return properties; }
        }

        public static DataTable ConvertToDataTable<T>(IList<T> data)
        {
            properties = TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            foreach (T item in data)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;
        }
    }
}
