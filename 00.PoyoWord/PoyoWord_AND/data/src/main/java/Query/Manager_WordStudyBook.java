package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Manager_WordStudyBook {

    SQLiteDatabase db;
    ContentValues row;
    Context ctx;
    DBHelper mHelper;

    public Manager_WordStudyBook(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);
    }

    public ArrayList<Map> Search() {

        ArrayList<Map> list = new ArrayList<>();

        Map map = null;

        db = mHelper.getReadableDatabase();

        Cursor cursor;
        cursor = db.rawQuery(Query_WordStudyBook.GetList, null);

        while(cursor.moveToNext()) {

            map = new HashMap();

            map.put("WSB_SN", cursor.getInt(cursor.getColumnIndex("WSB_SN")));
            map.put("WSB_NAME", cursor.getString(cursor.getColumnIndex("WSB_NAME")));
            map.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            map.put("WSB_CNT_UNIT", cursor.getInt(cursor.getColumnIndex("WSB_CNT_UNIT")));
            map.put("WSB_CNT_UNIT_WORD", cursor.getInt(cursor.getColumnIndex("WSB_CNT_UNIT_WORD")));
            map.put("WSB_REGISTERDT", cursor.getString(cursor.getColumnIndex("WSB_REGISTERDT")));
            map.put("WSB_FROMDT", cursor.getString(cursor.getColumnIndex("WSB_FROMDT")));
            map.put("WSB_TODT", cursor.getString(cursor.getColumnIndex("WSB_TODT")));

            list.add(map);
        }

        return list;
    }

    public Map Search(String WSB_SN) {

        ArrayList<Map> list = new ArrayList<>();

        Map<String, Object> map = new HashMap<String, Object>();

        db = mHelper.getReadableDatabase();

        String query = String.format(Query_WordStudyBook.GetData, WSB_SN);

        Cursor cursor;
        cursor = db.rawQuery(query, null);

        while(cursor.moveToNext()) {

            Map<String, Object> mapData = new HashMap<String, Object>();

            map.put("WSB_SN", cursor.getInt(cursor.getColumnIndex("WSB_SN")));
            map.put("WSB_NAME", cursor.getString(cursor.getColumnIndex("WSB_NAME")));
            map.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            map.put("WSB_CNT_UNIT", cursor.getInt(cursor.getColumnIndex("WSB_CNT_UNIT")));
            map.put("WSB_CNT_UNIT_WORD", cursor.getInt(cursor.getColumnIndex("WSB_CNT_UNIT_WORD")));
            map.put("WSB_REGISTERDT", cursor.getString(cursor.getColumnIndex("WSB_REGISTERDT")));
            map.put("WSB_FROMDT", cursor.getString(cursor.getColumnIndex("WSB_FROMDT")));
            map.put("WSB_TODT", cursor.getString(cursor.getColumnIndex("WSB_TODT")));

            mapData.put("MWSW_SN", cursor.getString(cursor.getColumnIndex("MWSW_SN")));
            mapData.put("WORD_UNIT_SN", cursor.getString(cursor.getColumnIndex("WORD_UNIT_SN")));

            mapData.put("WORD_SN", cursor.getString(cursor.getColumnIndex("WORD_SN")));
            mapData.put("WORD_UNIT_SN", cursor.getString(cursor.getColumnIndex("WORD_UNIT_SN")));
            mapData.put("WORD_WORD", cursor.getString(cursor.getColumnIndex("WORD_WORD")));
            mapData.put("WORD_MEAN", cursor.getString(cursor.getColumnIndex("WORD_MEAN")));
            mapData.put("WORD_SPELLING", cursor.getString(cursor.getColumnIndex("WORD_SPELLING")));
            mapData.put("WORD_SOUND", cursor.getString(cursor.getColumnIndex("WORD_SOUND")));
            mapData.put("WORD_SOUND_FILE", cursor.getString(cursor.getColumnIndex("WORD_SOUND_FILE")));
            mapData.put("WORD_EXAM", cursor.getString(cursor.getColumnIndex("WORD_EXAM")));
            mapData.put("WORD_EXAM_MEAN", cursor.getString(cursor.getColumnIndex("WORD_EXAM_MEAN")));
            mapData.put("WORD_TYPE_CD", cursor.getString(cursor.getColumnIndex("WORD_TYPE_CD")));
            mapData.put("WORD_LEVEL_CD", cursor.getString(cursor.getColumnIndex("WB_DESC")));
            mapData.put("WORD_IMPORTANT", cursor.getString(cursor.getColumnIndex("WORD_IMPORTANT")));
            mapData.put("WORD_LEARNYN", cursor.getString(cursor.getColumnIndex("WORD_LEARNYN")));
            mapData.put("WORD_IMAGE", cursor.getString(cursor.getColumnIndex("WORD_IMAGE")));
            mapData.put("WORD_LIKE", cursor.getString(cursor.getColumnIndex("WORD_LIKE")));
            mapData.put("WORD_USEYN", cursor.getString(cursor.getColumnIndex("WORD_USEYN")));

            list.add(mapData);
        }

        map.put("WSB_SN", list.get(0).get("WSB_SN"));
        map.put("WSB_NAME", list.get(0).get("WSB_NAME"));
        map.put("WAL_SN", list.get(0).get("WAL_SN"));
        map.put("WSB_CNT_UNIT", list.get(0).get("WSB_CNT_UNIT"));
        map.put("WSB_CNT_UNIT_WORD", list.get(0).get("WSB_CNT_UNIT_WORD"));
        
        map.put("WSB_REGISTERDT", list.get(0).get("WSB_REGISTERDT"));
        map.put("WSB_FROMDT", list.get(0).get("WSB_FROMDT"));
        map.put("WSB_TODT", list.get(0).get("WSB_TODT"));

        map.put("WORD_LIST", list);


        return map;
    }

    public boolean Insert(Map data) {
        try {
            String query = String.format(Query_WordStudyBook.Insert,
                    data.get("WSB_NAME").toString(),
                    data.get("WAL_SN").toString(),
                    data.get("WSB_CNT_UNIT").toString(),
                    data.get("WSB_CNT_UNIT_WORD").toString(),
                    data.get("WSB_REGISTERDT").toString(),
                    data.get("WSB_FROMDT").toString(),
                    data.get("WSB_TODT").toString()
            );

            db = mHelper.getReadableDatabase();

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }

    public boolean Update(Map data) {
        try {
            String query = String.format(Query_WordStudyBook.Update,
                    data.get("WSB_NAME").toString(),
                    data.get("WAL_SN").toString(),
                    data.get("WSB_CNT_UNIT").toString(),
                    data.get("WSB_CNT_UNIT_WORD").toString(),
                    data.get("WSB_REGISTERDT").toString(),
                    data.get("WSB_FROMDT").toString(),
                    data.get("WSB_TODT").toString(),
                    data.get("WSB_SN").toString()
            );

            db = mHelper.getReadableDatabase();

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }
}
