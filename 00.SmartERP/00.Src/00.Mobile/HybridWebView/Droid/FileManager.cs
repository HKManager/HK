using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System.IO;
using Android.Content.Res;
using Android.Util;

namespace CustomRenderer.Droid
{
    public static class FileManager
    {
        public static bool isCheckFile(Context mContext, string folderPath, string fileName)
        {
            string filePath = string.Format("{0}/{1}/{2}", Android.OS.Environment.ExternalStorageDirectory, folderPath, fileName);

            FileInfo file = new FileInfo(filePath);

            if (file.Exists)
            {
                return true;
            }

            return false;
        }

        public static void CopyFile(Context mContext, string folderPath, string fileName)
        {
            Log.Debug(mContext.PackageName, "CopyFile");

            AssetManager manager = mContext.Assets;

            string path_folder = string.Format("{0}/{1}/", Android.OS.Environment.ExternalStorageDirectory, folderPath);
            string filePath = string.Format("{0}/{1}/{2}", Android.OS.Environment.ExternalStorageDirectory, folderPath, fileName);

            DirectoryInfo folder = new DirectoryInfo(path_folder);
            FileInfo file = new FileInfo(filePath);

            FileStream fos = null;

            try
            {
                if (folder.Exists)
                {
                }
                else
                {
                    folder.Create();
                }

                if (file.Exists)
                {
                    file.Delete();
                    file.Create();
                }

                // - 읽는다.
                Stream input = manager.Open(fileName);

                // - 저장한다.
                fos = File.Create(filePath);

                BufferedStream bos = new BufferedStream(fos);
                int read = -1;
                byte[] buffer = new byte[1024];
                while ((read = input.Read(buffer, 0, 1024)) > 0)
                {
                    bos.Write(buffer, 0, read);
                }

                bos.Flush();

                bos.Close();
                fos.Close();
                input.Close();

            }
            catch (IOException e)
            {
                Log.Error("ErrorMessage : ", e.Message);
            }
        }
    }
}