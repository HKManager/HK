using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.PoyoWordBook.Data
{
    public class 단어데이터
    {
public string DB_NAME { set; get; }

        public long WORD_SN { set; get; }
        public long WB_SN { set; get; }
        public long WORD_UNIT_SN { set; get; }
        public string WORD_WORD { set; get; }
        public string WORD_MEAN { set; get; }
        public string WORD_SPELLING { set; get; }
        public string WORD_SOUND { set; get; }
        public string WORD_SOUND_FILE { set; get; }
        public string WORD_EXAM { set; get; }
        public string WORD_EXAM_MEAN { set; get; }
        public string WORD_LEVEL { set; get; }
        public string WORD_IMPORTANT { set; get; }
        public bool WORD_LEARNYN { set; get; }
        public string WORD_IMAGE { set; get; }
        public string WORD_LIKE { set; get; }
        public bool WORD_USEYN { set; get; }

        public char[] WORD_SPELL_ARRAY { set; get; }
        public char[] WORD_SPELL_QUIZ { set; get; }

        public bool IsCheck { set; get; }
    }

    public class 단어정보
    {
        public List<단어데이터> words { set; get; }
        public long WAL_SN { set; get; }
        public long WB_LOOPCNT { set; get; }
        public long WB_INTERVAL { set; get; }
        public long WB_UNIT { set; get; }
        public List<DMS_CodeResponse> WAL_LOCS { set; get; }
    }

    public class 단어퀴즈결과
    {
        public long TYPE { set; get; }
        public string ANSER { set; get; }
        public string INPUT { set; get; }
        public bool RESULT {set; get;}
    }
}
