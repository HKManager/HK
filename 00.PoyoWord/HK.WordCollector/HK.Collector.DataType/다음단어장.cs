using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.DataType
{
    public class 다음단어장
    {
        public string 단어 { set; get; }
        public string 발음 { set; get; }
        public string 주요뜻 { set; get; }
        public string 메모 { set; get; }
        public string 암기여부 { set; get; }
        public string 저장날짜 { set; get; }
        public string 저장횟수 { set; get; }
        public string 사고내용 { set; get; }

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

        public bool IsCheck { set; get; }
    }
}
