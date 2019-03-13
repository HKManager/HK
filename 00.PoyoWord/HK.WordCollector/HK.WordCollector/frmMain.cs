using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HK.WordCollector
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private frm다음단어장수집 다음단어장수집 = new frm다음단어장수집();

        private void Show다음단어장수집()
        {
            다음단어장수집.Width = this.Width;
            다음단어장수집.Height = this.Height;
            다음단어장수집.WindowState = FormWindowState.Maximized;
            다음단어장수집.MdiParent = this;
            다음단어장수집.Show();
        }

        private void 다음단어장수집ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Show다음단어장수집();
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            Show다음단어장수집();
        }
    }
}
