package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    public List<Map> Search() {

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
        return list;
    }

    public boolean Insert(Map data) {
        try {
            String query = String.format(Query_WordAudLoc.Insert,
                    data.get("WAL_NAME").toString(),
                    data.get("WAL_LOCS").toString(),
                    data.get("WAL_UPDATE_DT".toCharArray()),
                    data.get("WAL_USEYN").toString(),
                    data.get("WAL_DESC").toString());

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }

    public boolean Update(Map data) {
        try {
            String query = String.format(Query_WordAudLoc.Update,
                    data.get("WAL_NAME").toString(),
                    data.get("WAL_LOCS").toString(),
                    data.get("WAL_UPDATE_DT".toCharArray()),
                    data.get("WAL_USEYN").toString(),
                    data.get("WAL_DESC").toString(),
                    data.get("WAL_SN").toString());
            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }
}
