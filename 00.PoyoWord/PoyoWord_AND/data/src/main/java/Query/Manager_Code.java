package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Manager_Code {

    SQLiteDatabase db;
    ContentValues row;
    Context ctx;
    DBHelper mHelper;

    public Manager_Code(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);
    }

    public void Search() {

        ArrayList<Map> list = new ArrayList<>();

        Map map = null;

        db = mHelper.getReadableDatabase();

        Cursor cursor;
        cursor = db.rawQuery(Query_Code.GetList, null);

        while(cursor.moveToNext()) {

            map = new HashMap();

            map.put("CODE", cursor.getString(cursor.getColumnIndex("CODE")));
            map.put("CODE_NAME", cursor.getString(cursor.getColumnIndex("CODE_NAME")));

            list.add(map);
        }

        //if(cursor.moveToFirst()) {
        //    map.put("CODE", cursor.getString(cursor.getColumnIndex("CODE")));
        //}

        int abc = 0;
    }
}
