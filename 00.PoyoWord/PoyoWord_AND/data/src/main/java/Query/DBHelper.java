package Query;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import study.hk.data.Data.HARDCODE;

public class DBHelper extends SQLiteOpenHelper {
    Context mContext;
    public DBHelper(Context context) {
// Database이름은 실제 단말상에서 생성될 파일이름입니다. data/data/package명/databases/DATABASE_NAME식으로 저장
        super(context, HARDCODE.DataBase, null, 1);	// 제일 마지막 인자 : 버젼, 만약 버젼이 높아지면 onUpgrade를 수행한다.
        mContext =  context;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}
