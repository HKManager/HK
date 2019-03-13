using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using HK.Collector.Excel;

namespace HK.WordCollector
{
    public partial class ctl다음단어장수집 : UserControl
    {
        public ctl다음단어장수집()
        {
            InitializeComponent();
        }

        private void btn폴더선택_Click(object sender, EventArgs e)
        {
            using (var fldrDlg = new FolderBrowserDialog())
            {
                //fldrDlg.Filter = "Png Files (*.png)|*.png";
                //fldrDlg.Filter = "Excel Files (*.xls, *.xlsx)|*.xls;*.xlsx|CSV Files (*.csv)|*.csv"

                if (fldrDlg.ShowDialog() == DialogResult.OK)
                {
                    txt폴더주소.Text = fldrDlg.SelectedPath;
                    //fldrDlg.SelectedPath -- your result
                }
            }
        }

        private void btn수집시작_Click(object sender, EventArgs e)
        {
            if(string.IsNullOrEmpty(txt폴더주소.Text))
            {
                return;
            }

            다음단어장수집기.GetInstance().단어수집시작(txt폴더주소.Text);

            list완료여부.DataSource = new List<string>();
        }
    }
}
