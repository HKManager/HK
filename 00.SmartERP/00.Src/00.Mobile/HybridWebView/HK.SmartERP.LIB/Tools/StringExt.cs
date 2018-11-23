using System;
using System.Collections.Generic;
using System.Text;

namespace HK.SmartERP.LIB.Tools
{
    /// <summary>
    /// String 확장함수
    /// </summary>
    public static class StringExt
    {
        /// <summary>
        /// String이 Null 또는 Empty인지 검사
        /// </summary>
        /// <param name="value">String</param>
        /// <returns>Null 또는 Empty 여부</returns>
        public static bool IsEmpty(this string value)
        {
            return string.IsNullOrEmpty(value);
        }

        /// <summary>
        /// 현재 Application Path 하위의 파일 Path를 리턴
        /// </summary>
        /// <param name="fileName">파일명</param>
        /// <returns>Application Path가 적용된 파일 Path</returns>
        //public static string ToAppPath(this string fileName)
        //{
        //    return System.IO.Path.Combine(System.Windows.Forms.Application.StartupPath, fileName);
        //}

        ///// <summary>
        ///// Application 하위에 특정 폴더명을 추가하여 파일 Path를 리턴
        ///// </summary>
        ///// <param name="fileName">파일명</param>
        ///// <param name="path">추가할 폴더명</param>
        ///// <returns>Application Path가 적용된 파일 Path</returns>
        //public static string ToAppPath(this string fileName, string path)
        //{
        //    return System.IO.Path.Combine(System.Windows.Forms.Application.StartupPath, path, fileName);
        //}

        /// <summary>
        /// Path로부터 파일명만을 리턴
        /// </summary>
        /// <param name="path">파일 Path</param>
        /// <returns>파일명</returns>
        public static string ExtractFileName(this string path)
        {
            return System.IO.Path.GetFileName(path);
        }

        /// <summary>
        /// 오른쪽으로부터 특정 길이만큼을 잘라서 리턴
        /// </summary>
        /// <param name="value">String</param>
        /// <param name="length">길이</param>
        /// <returns>잘린 String</returns>
        public static string SubstringRight(this string value, int length)
        {
            if (value.Length <= length)
                return value;
            else
            {
                return value.Substring(value.Length - length);
            }
        }
    }
}
