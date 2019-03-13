namespace HK.WordCollector
{
    partial class ctl다음단어장수집
    {
        /// <summary> 
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 구성 요소 디자이너에서 생성한 코드

        /// <summary> 
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.btn폴더선택 = new System.Windows.Forms.Button();
            this.txt폴더주소 = new System.Windows.Forms.TextBox();
            this.btn수집시작 = new System.Windows.Forms.Button();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.list완료여부 = new System.Windows.Forms.ListBox();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 3;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 90F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 90F));
            this.tableLayoutPanel1.Controls.Add(this.btn폴더선택, 1, 0);
            this.tableLayoutPanel1.Controls.Add(this.txt폴더주소, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.btn수집시작, 2, 0);
            this.tableLayoutPanel1.Controls.Add(this.list완료여부, 0, 1);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(698, 411);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // btn폴더선택
            // 
            this.btn폴더선택.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btn폴더선택.Location = new System.Drawing.Point(521, 3);
            this.btn폴더선택.Name = "btn폴더선택";
            this.btn폴더선택.Size = new System.Drawing.Size(84, 26);
            this.btn폴더선택.TabIndex = 0;
            this.btn폴더선택.Text = "폴더선택";
            this.btn폴더선택.UseVisualStyleBackColor = true;
            this.btn폴더선택.Click += new System.EventHandler(this.btn폴더선택_Click);
            // 
            // txt폴더주소
            // 
            this.txt폴더주소.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txt폴더주소.Font = new System.Drawing.Font("굴림", 12F);
            this.txt폴더주소.Location = new System.Drawing.Point(3, 3);
            this.txt폴더주소.Name = "txt폴더주소";
            this.txt폴더주소.Size = new System.Drawing.Size(512, 26);
            this.txt폴더주소.TabIndex = 1;
            this.txt폴더주소.Text = "E:\\00.MyFolder\\00.GITHUB\\HK\\00.PoyoWord\\00.Docs";
            // 
            // btn수집시작
            // 
            this.btn수집시작.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btn수집시작.Location = new System.Drawing.Point(611, 3);
            this.btn수집시작.Name = "btn수집시작";
            this.btn수집시작.Size = new System.Drawing.Size(84, 26);
            this.btn수집시작.TabIndex = 2;
            this.btn수집시작.Text = "수집시작";
            this.btn수집시작.UseVisualStyleBackColor = true;
            this.btn수집시작.Click += new System.EventHandler(this.btn수집시작_Click);
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // list완료여부
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.list완료여부, 3);
            this.list완료여부.Dock = System.Windows.Forms.DockStyle.Fill;
            this.list완료여부.FormattingEnabled = true;
            this.list완료여부.ItemHeight = 12;
            this.list완료여부.Items.AddRange(new object[] {
            "sadfasdf",
            "sdaf",
            "sadf",
            "sdaf"});
            this.list완료여부.Location = new System.Drawing.Point(3, 35);
            this.list완료여부.Name = "list완료여부";
            this.list완료여부.Size = new System.Drawing.Size(692, 373);
            this.list완료여부.TabIndex = 3;
            // 
            // ctl다음단어장수집
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "ctl다음단어장수집";
            this.Size = new System.Drawing.Size(698, 411);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Button btn폴더선택;
        private System.Windows.Forms.TextBox txt폴더주소;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.Button btn수집시작;
        private System.Windows.Forms.ListBox list완료여부;
    }
}
