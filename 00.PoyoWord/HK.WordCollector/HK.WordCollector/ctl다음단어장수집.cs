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
using HK.Collector.Web;

namespace HK.WordCollector
{
    public partial class ctl다음단어장수집 : UserControl
    {
        public ctl다음단어장수집()
        {
            InitializeComponent();
        }
        private string temp = string.Empty;
        private int index = 0;

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

            //list완료여부.DataSource = finishList;
        }

        private void Finish(string name, bool result)
        {
            index ++;
            temp = string.Format("{0}. 단어장 - {1} : {2}", index, name, result ? "완료" : "실패");
            ShowListBox();
        }

        private void ShowListBox()
        {
            if (this.InvokeRequired)
            {
                this.Invoke(new Action(ShowListBox));
            }
            else
            {
                list완료여부.Items.Add(temp);
                list완료여부.Refresh();
            }

        }

        private void ctl다음단어장수집_Load(object sender, EventArgs e)
        {
            다음단어장수집기.GetInstance().Finished += Finish;

            //var word = 구글수집기.GetInstance().구글번역("word", "ko");
            var wordMean = 구글수집기.GetInstance().구글번역("과일", "en");
        }
    }
}
