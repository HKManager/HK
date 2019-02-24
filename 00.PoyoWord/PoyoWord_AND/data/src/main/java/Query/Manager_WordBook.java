package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Manager_WordBook {

    SQLiteDatabase db;
    ContentValues row;
    Context ctx;
    DBHelper mHelper;

    public Manager_WordBook(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);
    }

    public ArrayList<Map> Search() {

        ArrayList<Map> list = new ArrayList<>();

        Map map = null;

        db = mHelper.getReadableDatabase();

        Cursor cursor;
        cursor = db.rawQuery(Query_WordBook.GetList, null);

        while(cursor.moveToNext()) {

            map = new HashMap();

            map.put("WB_SN", cursor.getInt(cursor.getColumnIndex("WB_SN")));
            map.put("WB_NAME", cursor.getString(cursor.getColumnIndex("WB_NAME")));
            map.put("WB_LEVEL_CD", cursor.getString(cursor.getColumnIndex("WB_LEVEL_CD")));
            map.put("WB_CNT_UNIT", cursor.getInt(cursor.getColumnIndex("WB_CNT_UNIT")));
            map.put("WB_CNT_WORD_UNIT", cursor.getInt(cursor.getColumnIndex("WB_CNT_WORD_UNIT")));
            map.put("WB_CNT_WORD", cursor.getInt(cursor.getColumnIndex("WB_CNT_WORD")));
            map.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            map.put("WB_LOOPCNT", cursor.getInt(cursor.getColumnIndex("WB_LOOPCNT")));
            map.put("WB_INTERVAL", cursor.getInt(cursor.getColumnIndex("WB_INTERVAL")));
            map.put("WB_USEYN", cursor.getString(cursor.getColumnIndex("WB_USEYN")));
            map.put("WB_REGISTERDT", cursor.getString(cursor.getColumnIndex("WB_REGISTERDT")));
            map.put("WB_DESC", cursor.getString(cursor.getColumnIndex("WB_DESC")));

            list.add(map);
        }

        //if(cursor.moveToFirst()) {
        //    map.put("CODE", cursor.getString(cursor.getColumnIndex("CODE")));
        //}

        return list;
    }

    public Map Search(String WB_SN) {

        ArrayList<Map> list = new ArrayList<>();

        Map<String, Object> map = new HashMap<String, Object>();

        db = mHelper.getReadableDatabase();

        String query = String.format(Query_WordBook.GetData, WB_SN);

        Cursor cursor;
        cursor = db.rawQuery(query, null);

        while(cursor.moveToNext()) {

            Map<String, Object> mapData = new HashMap<String, Object>();

            mapData.put("WB_SN", cursor.getInt(cursor.getColumnIndex("WB_SN")));
            mapData.put("WB_NAME", cursor.getString(cursor.getColumnIndex("WB_NAME")));
            mapData.put("WB_LEVEL_CD", cursor.getString(cursor.getColumnIndex("WB_LEVEL_CD")));
            mapData.put("WB_CNT_UNIT", cursor.getInt(cursor.getColumnIndex("WB_CNT_UNIT")));
            mapData.put("WB_CNT_WORD_UNIT", cursor.getInt(cursor.getColumnIndex("WB_CNT_WORD_UNIT")));
            mapData.put("WB_CNT_WORD", cursor.getInt(cursor.getColumnIndex("WB_CNT_WORD")));
            mapData.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            mapData.put("WB_LOOPCNT", cursor.getInt(cursor.getColumnIndex("WB_LOOPCNT")));
            mapData.put("WB_INTERVAL", cursor.getInt(cursor.getColumnIndex("WB_INTERVAL")));
            mapData.put("WB_USEYN", cursor.getString(cursor.getColumnIndex("WB_USEYN")));
            mapData.put("WB_REGISTERDT", cursor.getString(cursor.getColumnIndex("WB_REGISTERDT")));
            mapData.put("WB_DESC", cursor.getString(cursor.getColumnIndex("WB_DESC")));

            mapData.put("MWW_SN", cursor.getString(cursor.getColumnIndex("MWW_SN")));

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

        map.put("WB_SN", list.get(0).get("WB_SN"));
        map.put("WB_NAME", list.get(0).get("WB_NAME"));
        map.put("WB_LEVEL_CD", list.get(0).get("WB_LEVEL_CD"));
        map.put("WB_CNT_WORD", list.get(0).get("WB_CNT_WORD"));
        map.put("WORD_LIST", list);

        //if(cursor.moveToFirst()) {
        //    map.put("CODE", cursor.getString(cursor.getColumnIndex("CODE")));
        //}

        return map;
    }

    public boolean Insert(Map data) {
        try {
            String query = String.format(Query_WordAudLoc.Insert,
                    data.get("WB_NAME").toString(),
                    data.get("WB_LEVEL_CD").toString(),
                    data.get("WB_CNT_UNIT").toString(),
                    data.get("WB_CNT_WORD_UNIT").toString(),
                    data.get("WB_CNT_WORD").toString(),
                    data.get("WAL_SN").toString(),
                    data.get("WB_LOOPCNT").toString(),
                    data.get("WB_INTERVAL").toString(),
                    data.get("WB_USEYN").toString(),
                    data.get("WB_REGISTERDT").toString(),
                    data.get("WB_DESC").toString()
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
            String query = String.format(Query_WordAudLoc.Update,
                    data.get("WB_NAME").toString(),
                    data.get("WB_LEVEL_CD").toString(),
                    data.get("WB_CNT_UNIT").toString(),
                    data.get("WB_CNT_WORD_UNIT").toString(),
                    data.get("WB_CNT_WORD").toString(),
                    data.get("WAL_SN").toString(),
                    data.get("WB_LOOPCNT").toString(),
                    data.get("WB_INTERVAL").toString(),
                    data.get("WB_USEYN").toString(),
                    data.get("WB_REGISTERDT").toString(),
                    data.get("WB_DESC").toString(),
                    data.get("WB_SN").toString()
            );

            db = mHelper.getReadableDatabase();

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }
}
