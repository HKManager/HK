package Query;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import java.util.Map;

public class Manager_Word {

    SQLiteDatabase db;
    ContentValues row;
    Context ctx;
    DBHelper mHelper;

    public Manager_Word(Context ctx){
        this.ctx = ctx;
        mHelper = new DBHelper(ctx);
    }

    public boolean Insert(String WB_SN, Map data) {
        try {

            db = mHelper.getReadableDatabase();

            String query = "";

            query = String.format(Query_Word.Insert,
                    data.get("WORD_UNIT_SN").toString(),
                    data.get("WORD_WORD").toString(),
                    data.get("WORD_MEAN").toString(),
                    data.get("WORD_SPELLING").toString(),
                    data.get("WORD_SOUND").toString(),
                    data.get("WORD_SOUND_FILE").toString(),
                    data.get("WORD_EXAM").toString(),
                    data.get("WORD_EXAM_MEAN").toString(),
                    data.get("WORD_TYPE_CD").toString(),
                    data.get("WORD_LEVEL_CD").toString(),
                    data.get("WORD_IMPORTANT").toString(),
                    data.get("WORD_LEARNYN").toString(),
                    data.get("WORD_IMAGE").toString(),
                    data.get("WORD_LIKE").toString(),
                    data.get("WORD_USEYN").toString()
            );

            db.execSQL(query);

            if(WB_SN.equals("")) {

                query = Query_Mapping_WB_W.Insert;
            } else {
                query = String.format(Query_Mapping_WB_W.InsertWB_SN, WB_SN);
            }

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }

    public boolean Update(Map data) {
        try {
            String query = String.format(Query_Word.Update,
                    data.get("WORD_UNIT_SN").toString(),
                    data.get("WORD_WORD").toString(),
                    data.get("WORD_MEAN").toString(),
                    data.get("WORD_SPELLING").toString(),
                    data.get("WORD_SOUND").toString(),
                    data.get("WORD_SOUND_FILE").toString(),
                    data.get("WORD_EXAM").toString(),
                    data.get("WORD_EXAM_MEAN").toString(),
                    data.get("WORD_TYPE_CD").toString(),
                    data.get("WORD_LEVEL_CD").toString(),
                    data.get("WORD_IMPORTANT").toString(),
                    data.get("WORD_LEARNYN").toString(),
                    data.get("WORD_IMAGE").toString(),
                    data.get("WORD_LIKE").toString(),
                    data.get("WORD_USEYN").toString(),
                    data.get("WORD_SN").toString()
            );

            db = mHelper.getReadableDatabase();

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }

    public boolean Delete(Map data) {
        try {
            String query = String.format(Query_Word.Delete,
                    data.get("WORD_SN").toString()
            );

            db = mHelper.getReadableDatabase();

            db.execSQL(query);

            return true;
        }catch (Exception e) {
            return  false;
        }
    }

}
