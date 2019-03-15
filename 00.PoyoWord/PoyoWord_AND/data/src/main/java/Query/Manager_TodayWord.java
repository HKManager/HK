package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Manager_TodayWord {

    private SQLiteDatabase db;
    private ContentValues row;
    private Context ctx;
    private DBHelper mHelper;

    private static Manager_TodayWord _instance = null;

    public static Manager_TodayWord GetInstance()
    {
        return _instance;
    }

    public List<Map> wordList = null;
    public List<Map> wordList_NoLOCS = null;

    public Manager_TodayWord(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);

        wordList = new ArrayList<>();
        wordList_NoLOCS = new ArrayList<>();

        _instance = this;
    }

    public void Load() {

        Map mapData = null;
        Map mapDataNoLocs = null;

        db = mHelper.getReadableDatabase();

        Cursor cursor;
        cursor = db.rawQuery(Query_TodayWord.GetList, null);

        while(cursor.moveToNext()) {

            mapData = new HashMap();
            mapDataNoLocs = new HashMap();

            mapDataNoLocs.put("TW_SN", cursor.getInt(cursor.getColumnIndex("TW_SN")));
            mapDataNoLocs.put("TW_DATE", cursor.getString(cursor.getColumnIndex("TW_DATE")));
            mapDataNoLocs.put("TEST_YN", cursor.getInt(cursor.getColumnIndex("TEST_YN")));

            mapDataNoLocs.put("WB_SN", cursor.getInt(cursor.getColumnIndex("WB_SN")));
            mapDataNoLocs.put("WORD_SN", cursor.getString(cursor.getColumnIndex("WORD_SN")));
            mapDataNoLocs.put("WORD_WORD", cursor.getString(cursor.getColumnIndex("WORD_WORD")));
            mapDataNoLocs.put("WORD_MEAN", cursor.getString(cursor.getColumnIndex("WORD_MEAN")));
            mapDataNoLocs.put("WORD_SPELLING", cursor.getString(cursor.getColumnIndex("WORD_SPELLING")));
            mapDataNoLocs.put("WORD_SOUND", cursor.getString(cursor.getColumnIndex("WORD_SOUND")));
            mapDataNoLocs.put("WORD_SOUND_FILE", cursor.getString(cursor.getColumnIndex("WORD_SOUND_FILE")));
            mapDataNoLocs.put("WORD_EXAM", cursor.getString(cursor.getColumnIndex("WORD_EXAM")));
            mapDataNoLocs.put("WORD_EXAM_MEAN", cursor.getString(cursor.getColumnIndex("WORD_EXAM_MEAN")));
            mapDataNoLocs.put("WORD_TYPE_CD", cursor.getString(cursor.getColumnIndex("WORD_TYPE_CD")));
            mapDataNoLocs.put("WORD_LEVEL_CD", cursor.getString(cursor.getColumnIndex("WORD_LEVEL_CD")));
            mapDataNoLocs.put("WORD_IMPORTANT", cursor.getString(cursor.getColumnIndex("WORD_IMPORTANT")));
            mapDataNoLocs.put("WORD_IMAGE", cursor.getString(cursor.getColumnIndex("WORD_IMAGE")));

            mapDataNoLocs.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            mapDataNoLocs.put("WAL_NAME", cursor.getString(cursor.getColumnIndex("WAL_NAME")));

            wordList_NoLOCS.add(mapDataNoLocs);


            mapData.put("TW_SN", cursor.getInt(cursor.getColumnIndex("TW_SN")));
            mapData.put("TW_DATE", cursor.getString(cursor.getColumnIndex("TW_DATE")));
            mapData.put("TEST_YN", cursor.getInt(cursor.getColumnIndex("TEST_YN")));

            mapData.put("WB_SN", cursor.getInt(cursor.getColumnIndex("WB_SN")));
            mapData.put("WORD_SN", cursor.getString(cursor.getColumnIndex("WORD_SN")));
            mapData.put("WORD_WORD", cursor.getString(cursor.getColumnIndex("WORD_WORD")));
            mapData.put("WORD_MEAN", cursor.getString(cursor.getColumnIndex("WORD_MEAN")));
            mapData.put("WORD_SPELLING", cursor.getString(cursor.getColumnIndex("WORD_SPELLING")));
            mapData.put("WORD_SOUND", cursor.getString(cursor.getColumnIndex("WORD_SOUND")));
            mapData.put("WORD_SOUND_FILE", cursor.getString(cursor.getColumnIndex("WORD_SOUND_FILE")));
            mapData.put("WORD_EXAM", cursor.getString(cursor.getColumnIndex("WORD_EXAM")));
            mapData.put("WORD_EXAM_MEAN", cursor.getString(cursor.getColumnIndex("WORD_EXAM_MEAN")));
            mapData.put("WORD_TYPE_CD", cursor.getString(cursor.getColumnIndex("WORD_TYPE_CD")));
            mapData.put("WORD_LEVEL_CD", cursor.getString(cursor.getColumnIndex("WORD_LEVEL_CD")));
            mapData.put("WORD_IMPORTANT", cursor.getString(cursor.getColumnIndex("WORD_IMPORTANT")));
            mapData.put("WORD_IMAGE", cursor.getString(cursor.getColumnIndex("WORD_IMAGE")));

            mapData.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            mapData.put("WAL_NAME", cursor.getString(cursor.getColumnIndex("WAL_NAME")));

            mapData.put("WAL_LOCS", cursor.getString(cursor.getColumnIndex("WAL_LOCS")));


            wordList.add(mapData);
        }
    }
}
