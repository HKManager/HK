package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Manager_WordAudLoc {

    SQLiteDatabase db;
    ContentValues row;
    Context ctx;
    DBHelper mHelper;

    public Manager_WordAudLoc(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);
    }

    public ArrayList<Map> Search() {

        ArrayList<Map> list = new ArrayList<>();

        Map map = null;

        db = mHelper.getReadableDatabase();

        Cursor cursor;
        cursor = db.rawQuery(Query_WordAudLoc.GetList, null);

        while(cursor.moveToNext()) {

            map = new HashMap();

            map.put("WAL_SN", cursor.getInt(cursor.getColumnIndex("WAL_SN")));
            map.put("WAL_NAME", cursor.getString(cursor.getColumnIndex("WAL_NAME")));
            //map.put("WAL_LOCS", cursor.getString(cursor.getColumnIndex("WAL_LOCS")));
            map.put("WAL_UPDATE_DT", cursor.getString(cursor.getColumnIndex("WAL_UPDATE_DT")));
            map.put("WAL_USEYN", cursor.getInt(cursor.getColumnIndex("WAL_USEYN")));
            map.put("WAL_DESC", cursor.getString(cursor.getColumnIndex("WAL_DESC")));

            list.add(map);
        }

        //if(cursor.moveToFirst()) {
        //    map.put("CODE", cursor.getString(cursor.getColumnIndex("CODE")));
        //}

        return list;
    }
}
