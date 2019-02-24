function Main() {
    window.location.href = "../../main/index.html";
}

var emptyWord = { WB_SN: '', WB_NAME: '', WB_LEVEL_CD: '', WB_CNT_UNIT: '', WB_CNT_WORD_UNIT: '', WB_CNT_WORD: ''
                , WAL_SN: '', WB_LOOPCNT: '', WB_INTERVAL: '', WB_USEYN: '', WB_REGISTERDT: '', WB_DESC: '' 
                , MWW_SN: ''
                , WORD_SN: '', WORD_UNIT_SN: '', WORD_WORD: '', WORD_MEAN: '', WORD_SPELLING: '', WORD_SOUND: '', WORD_SOUND_FILE: ''
                , WORD_EXAM: '', WORD_EXAM_MEAN: '', WORD_TYPE_CD: '001', WORD_LEVEL_CD: '001', WORD_IMPORTANT: ''
                , WORD_LEARNYN: '', WORD_IMAGE: '', WORD_LIKE: '', WORD_USEYN: ''};

function AddWord() {
    gridData.push(emptyWord);

    datagrid.refresh(); //데이터 초기화
}