namespace HK.WordCollector
{
    partial class frm다음단어장수집
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.ctl다음단어장수집1 = new HK.WordCollector.ctl다음단어장수집();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Controls.Add(this.ctl다음단어장수집1, 0, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 1;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 449F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(629, 449);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // ctl다음단어장수집1
            // 
            this.ctl다음단어장수집1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ctl다음단어장수집1.Location = new System.Drawing.Point(3, 3);
            this.ctl다음단어장수집1.Name = "ctl다음단어장수집1";
            this.ctl다음단어장수집1.Size = new System.Drawing.Size(623, 443);
            this.ctl다음단어장수집1.TabIndex = 0;
            // 
            // frm다음단어장수집
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(629, 449);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "frm다음단어장수집";
            this.ShowIcon = false;
            this.Text = "다음단어장수집";
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private ctl다음단어장수집 ctl다음단어장수집1;
    }
}