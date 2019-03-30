package com.ghlab.android.extensionedittext;

import android.app.Activity;
import android.app.AlertDialog.Builder;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

public class ExtensionEditTextActivity extends Activity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		/**
		 * 키보드 자동 띄우기는 activity 지정 부분에
		 * android:windowSoftInputMode="stateAlwaysVisible" 옵션으로 들어가져 있다.
		 */
		ExtensionEditText editText = (ExtensionEditText)findViewById(R.id.et);

		editText.requestFocus();

		Handler handler = new Handler() {
			/**
			 * @param msg
			 * @see android.os.Handler#handleMessage(android.os.Message)
			 */
			@Override
			public void handleMessage(Message msg) {

				Builder dialog = new Builder(ExtensionEditTextActivity.this);
				dialog.setMessage("데이터가 저장되지 않았습니다.\n레알 종료 하시겠습니까?");
				dialog.setPositiveButton("네네네네", new OnClickListener() {

					@Override
					public void onClick(DialogInterface dialog, int which) {
						finish();
					}
				});

				dialog.setNegativeButton("아차!", new OnClickListener() {

					@Override
					public void onClick(DialogInterface dialog, int which) {
					}
				});

				dialog.show();
			}
		};

		editText.setHiddenKeyboardOnBackPressed(false); // 백버튼을 눌러도 키보드가 사라지지 않게 지정
		editText.setOnBackPressedHandler(handler);
	}
}