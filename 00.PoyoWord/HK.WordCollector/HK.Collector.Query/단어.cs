using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.Collector.Query
{
    public class 단어
    {
        public const string GetList = @"
           SELECT
	              WORD_SN
                , WB_SN
                , WORD_UNIT_SN
                , WORD_WORD
                , WORD_MEAN
                , WORD_SPELLING
                , WORD_SOUND
                , WORD_SOUND_FILE
                , WORD_EXAM
                , WORD_EXAM_MEAN
                , WORD_LEVEL
                , WORD_IMPORTANT
                , CASE WORD_LEARNYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WORD_LEARNYN
                , WORD_IMAGE
                , WORD_LIKE
                , CASE WORD_USEYN WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END WORD_USEYN
            FROM word
            WHERE WB_SN = {0}
            AND WORD_USEYN = 0
        ";

        public const string Insert = @"
            INSERT INTO
                word
                (
                  WB_SN
                , WORD_UNIT_SN
                , WORD_WORD
                , WORD_MEAN
                , WORD_SPELLING
                , WORD_SOUND
                , WORD_SOUND_FILE
                , WORD_EXAM
	            , WORD_EXAM_MEAN
                , WORD_LEVEL
                , WORD_IMPORTANT
                , WORD_LEARNYN
                , WORD_IMAGE
                , WORD_LIKE
                , WORD_USEYN
                )     
                VALUES
                (
                    {0}
                    , {1}
                    , '{2}'
                    , '{3}'
                    , '{4}'
                    , '{5}'
                    , '{6}'
                    , '{7}'
                    , '{8}'
                    , '{9}'
                    , '{10}'
                    , '{11}'
                    , '{12}'
                    , '{13}'
                    , '{14}'
                )
        ";

        public const string Update = @"
            UPDATE word
            SET    WB_SN = {0}
                   , WORD_UNIT_SN = {1}
                   , WORD_WORD = '{2}'
                   , WORD_MEAN = '{3}'
                   , WORD_SPELLING = '{4}'
                   , WORD_SOUND = '{5}'
                   , WORD_SOUND_FILE = '{6}'
                   , WORD_EXAM = '{7}'
                   , WORD_EXAM_MEAN = '{8}'
                   , WORD_LEVEL = '{9}'
                   , WORD_IMPORTANT = '{10}'
                   , WORD_LEARNYN = '{11}'
                   , WORD_IMAGE = '{12}'
                   , WORD_LIKE = '{13}'
                   , WORD_USEYN = '{14}'
            WHERE  WORD_SN = {15}
        ";

        public const string UpdateImage = @"
            UPDATE word
            SET    WORD_IMAGE = '{0}'
            WHERE  WORD_SN = {1}
        ";

        public const string Delete = @"
            DELETE 
            FROM word
            WHERE WB_SN = {0}
        ";

        public const string Disable = @"
            UPDATE word
            SET WORD_USEYN = 1
            WHERE WB_SN = {0}
        ";
    }
}
