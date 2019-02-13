package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Manager_Code {

    private SQLiteDatabase db;
    private ContentValues row;
    private Context ctx;
    private DBHelper mHelper;

    private ArrayList<Map> list = null;

    private static Manager_Code _instance = null;

    public static Manager_Code GetInstance()
    {
        return _instance;
    }

    public Manager_Code(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);

        list = new ArrayList<>();

        _instance = this;
    }

    public void Load() {

        Map map = null;

        db = mHelper.getReadableDatabase();

        Cursor cursor;
        cursor = db.rawQuery(Query_Code.GetList, null);

        while(cursor.moveToNext()) {

            map = new HashMap();

            map.put("CODE", cursor.getString(cursor.getColumnIndex("CODE")));
            map.put("CODE_001", cursor.getString(cursor.getColumnIndex("CODE_001")));
            map.put("CODE_002", cursor.getString(cursor.getColumnIndex("CODE_002")));
            map.put("CODE_003", cursor.getString(cursor.getColumnIndex("CODE_003")));
            map.put("CODE_NAME", cursor.getString(cursor.getColumnIndex("CODE_NAME")));
            map.put("CODE_TYPE", cursor.getString(cursor.getColumnIndex("CODE_TYPE")));
            map.put("CODE_SORT", cursor.getInt(cursor.getColumnIndex("CODE_SORT")));
            map.put("USEYN", cursor.getString(cursor.getColumnIndex("USEYN")));
            map.put("CODE_UPDATE_SN", cursor.getInt(cursor.getColumnIndex("CODE_UPDATE_SN")));
            map.put("CODE_UPDATE_DATE", cursor.getString(cursor.getColumnIndex("CODE_UPDATE_DATE")));
            map.put("CODE_DESC", cursor.getString(cursor.getColumnIndex("CODE_DESC")));

            list.add(map);
        }
    }

    public ArrayList<Map> GetList_1st(String codeID, String codeName, boolean useYN) {
        return null;
    }

    public ArrayList<Map> GetList_2nd(String CD1, boolean useYN) {
        return null;
    }

    public static ArrayList<Map> GetList_3rd(String CD1, String CD2, boolean useYN) {
        return null;
    }
}
