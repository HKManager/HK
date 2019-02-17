package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Manager_Code {

    private SQLiteDatabase db;
    private ContentValues row;
    private Context ctx;
    private DBHelper mHelper;

    private List<Map> list = null;

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

    public List<Map> GetList_1st(String codeID, String codeName, boolean useYN) {

        List<Map> listResult = null;

        try {

            listResult = list.stream().
                    filter(t -> (t.get("CODE").toString().equals(codeID) || codeID.isEmpty() || codeID == null)
                            &&codeName.isEmpty() || t.get("CODE_NAME").toString().contains(codeName)
                            && (t.get("CODE_002").toString().equals("---") || t.get("CODE_002").toString().equals("") || t.get("CODE_002").equals(null))
                            && (t.get("CODE_003").toString().equals("---") || t.get("CODE_003").toString().equals("") || t.get("CODE_003").equals(null))
                    ).collect(Collectors.toList());

        }catch (Exception e) {
            e.printStackTrace();
        }

        return listResult;
    }

    public List<Map> GetList_2nd(String CD1, final boolean useYN) {

        List<Map> listResult = null;

        try {
            listResult = list.stream().
                    filter(t -> (t.get("CODE_001").toString().equals(CD1))
                            && (!t.get("CODE_002").toString().equals("---") && !t.get("CODE_002").toString().equals("") && !t.get("CODE_002").equals(null))
                            && (t.get("CODE_003").toString().equals("---") || t.get("CODE_003").toString().equals("") || t.get("CODE_003").equals(null))
                    ).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return listResult;
    }

    public List<Map> GetList_3rd(String CD1, String CD2, boolean useYN) {

        List<Map> listResult = null;

        try {
            listResult = list.stream().
                    filter(t -> (t.get("CODE_001").toString()).equals(CD1)
                            && (t.get("CODE_002").toString()).equals(CD2)
                            && (!t.get("CODE003").toString().equals("---") && !t.get("CODE_003").toString().equals("") && !t.get("CODE_003").equals(null))
                    ).collect(Collectors.toList());
        }catch (Exception e) {
            e.printStackTrace();
        }

        return listResult ;
    }

    // - 01. 검색조건에 적합한 코드 데이터를 조회한다. (리스트용)
    public List<Map> GetAllList_1st(String codeID, String codeName) {
        return null;
    }

    public List<Map> GetAllList_2nd(String CD1) {
        return null;
    }

    public List<Map> GetAllList_3rd(String CD1, String CD2) {
        return null;
    }
    // - 01. 검색조건에 적합한 코드 데이터를 조회한다. (리스트용)

    //-  02. 콤보박스용

    public List<Map> GetCombo_1st(boolean addEmptyRow) {
        List<Map> listResult = null;

        try {

            listResult = list.stream().
                    filter(t -> (t.get("CODE_002").toString().equals("---") || t.get("CODE_002").toString().equals("") || t.get("CODE_002").equals(null))
                            && (t.get("CODE_003").toString().equals("---") || t.get("CODE_003").toString().equals("") || t.get("CODE_003").equals(null))
                    ).collect(Collectors.toList());

            if(addEmptyRow) {

                Map<String, Object> data = new HashMap<String,Object>();

                data.put("CODE", "");
                data.put("CODE_NAME", "전체");

                listResult.add(data);
            }

        }catch (Exception e) {
            e.printStackTrace();
        }

        return listResult;
    }

    public List<Map> GetCombo_2nd(String CD1, boolean addEmptyRow) {
        List<Map> listResult = null;

        try {
            listResult = list.stream().
                    filter(t -> (t.get("CODE_001").toString().equals(CD1))
                            && (!t.get("CODE_002").toString().equals("---") && !t.get("CODE_002").toString().equals("") && !t.get("CODE_002").equals(null))
                            && (t.get("CODE_003").toString().equals("---") || t.get("CODE_003").toString().equals("") || t.get("CODE_003").equals(null))
                    ).collect(Collectors.toList());

            if(addEmptyRow) {

                Map<String, Object> data = new HashMap<String,Object>();

                data.put("CODE", "");
                data.put("CODE_NAME", "전체");

                listResult.add(data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return listResult;
    }

    public List<Map> GetCombo_3rd(String CD1, String CD2, boolean addEmptyRow) {
        List<Map> listResult = null;

        try {
            listResult = list.stream().
                    filter(t -> (t.get("CODE_001").toString()).equals(CD1)
                            && (t.get("CODE_002").toString()).equals(CD2)
                            && (!t.get("CODE003").toString().equals("---") && !t.get("CODE_003").toString().equals("") && !t.get("CODE_003").equals(null))
                    ).collect(Collectors.toList());

            if(addEmptyRow) {

                Map<String, Object> data = new HashMap<String,Object>();

                data.put("CODE", "");
                data.put("CODE_NAME", "전체");

                listResult.add(data);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }

        return listResult ;
    }

    //-  02. 콤보박스용
}
