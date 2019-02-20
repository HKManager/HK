function clickEvn() {
    var nRow = datagrid1.getRow();
    var nCol = datagrid1.getCol();
    var colName = datagrid1.getCellData(nRow, 1);
    var getChecked = datagrid1.getCellData(nRow, 0);
    var bData = datagrid1.getCellData(nRow, 2);

    //체크박스 클릭시 true, false 변경
    if (nCol == 0) {
        if (getChecked === 'true') {
            getChecked = 'false';
        } else {
            getChecked = 'true';
        }
    } else if (nCol !== 0) {

        switch (colName) {
            //input 박스만 쓰는 모달창
            case 'parentid':
            case 'backcoloralternate':
            case 'alternatecycle':
            case 'emptyrecords':
            case 'width':
            case 'height':
            case 'fixedrowheight':
            case 'rowheight':
            case 'frozenrows':
            case 'frozenbottomrows':
            case 'frozencols':
			case 'rowdatatype':
			case 'rowheaderbackcoloralternate':
			case 'emptyrecordsfontstyle':
            case 'resizinginterval':
			case 'rowheader':
            case 'rowheaderwidth':
            case 'rowheadercaption':
			case 'finddata':
            case 'showselectedcellsinfo':
				$("#inputModal").dialog("open");
                $('#inputP').text(arrMessage[colName]);
                $('#inputM').attr('placeholder', plcMessage[colName]);
                break;

			case 'jsonref':
                $("#textareaModal").dialog("open");
                $('#textP').text(arrMessage[colName]);
                $('#textM').attr('placeholder', plcMessage[colName]);
                break;

                //boolean 선택하는 모달창
            case 'waitingui':
            case 'ellipsis':
            case 'allowselection':
            case 'allowuserresize':
            case 'oneclickedit':
            case 'disabled':
            case 'rowdragmove':
            case 'whitespacemerge':
            case 'tooltip':
            case 'usemultisorting':
            case 'allowcopy':
            case 'allowpaste':
            case 'automerge':
			case 'datamergefalseskip':
            case 'limitscrollrow':
            case 'headermark':
            case 'locale':
            case 'scrollbubbling':
            case 'showtotalrows':
            case 'emptycellonpaste':
                $("#bModal").dialog("open");
                $('#booPut').text(booleanMessage[colName]);
                break;

                //paging은 오브젝트로 넘겨줘야 해서 따로 생성
            case 'paging':
                $("#multiInput").dialog("open");
                $('#mInputP').text('페이징 기능을 사용 할 수 있습니다.');
                break;

            case 'extendlastcol':
            case 'explorerbar':
            case 'mergecells':
            case 'mergecellsfixedrows':
            case 'selectmode':
            case 'tooltiptype':
                $("#multiInput1").dialog("open");
                $('#mInputP1').text(selectObj[colName].message);
                $('#bUse1').remove();
                $('#inputButton4').remove();
                //getSelectHtml 함수를 호출 한 후에 데이터를 넘겨서 for문을 돌린다.
                $('#multiselect').append(getSelectHtml(selectObj[colName].arr));
                break;
        } //end of switch
    }
}

//textArea 박스가 하나 있는 컬럼들을 입력할 때 발생하는 이벤트
function inputData() {

    var data = $('#inputM').val();
    var nRow = datagrid1.getRow();
    try {
        datagrid1.setCellData(nRow, 2, data);
        $("#inputModal").dialog("close");

        if ($('#inputM').val() == '') {
            datagrid1.setCellData(nRow, 0, 'false');
        } else {
            datagrid1.setCellData(nRow, 0, 'true');
        }
        $('#inputM').val('');
    } catch (e) {

    } finally {
        nRow = bUse = data = null;
    }
}

//json data 받는 textArea 컬럼들을 입력할 때 발생하는 이벤트
function textAreaInput() {
    var data = $('#textM').val();

    var nRow = datagrid1.getRow();
    try {
        $("#textareaModal").dialog("close");

        if ($('#textM').val() == '') {
            //datagrid1.setCellData(nRow, 0, 'false');
        } else {
			datagrid1.setCellData(nRow, 2, data);
            datagrid1.setCellData(nRow, 0, 'true');
        }
		removeField();
		initColumns(data);
    } catch (e) {

    } finally {
        nRow = bUse = data = null;
    }
}

//boolean 타입을 설정하는 컬럼들을 입력할 때 발생하는 이벤트
function booData() {

    var data = $('#tSel').val();
    var nRow = datagrid1.getRow();

    try {
        datagrid1.setCellData(nRow, 2, data);
        $("#bModal").dialog("close");

        datagrid1.setCellData(nRow, 0, 'true');

    } catch (e) {

    } finally {
        nRow = bUse = data = null;
    }
}

//paging을 위한 event
function mInputData() {

    var nRow = datagrid1.getRow();
    var bUse = $('#bUse').val();
    var mInput1 = $('#mInput1').val();
    var mInput2 = $('#mInput2').val();
    var data = '{type :' + bUse + ', count :' + mInput1 + ', size : ' + mInput2 + '}';

    try {
        datagrid1.setCellData(nRow, 2, data);
        if (bUse == 'none' || mInput1 == '' || mInput2 == '') {
            datagrid1.setCellData(nRow, 0, 'false');
        } else {
            datagrid1.setCellData(nRow, 0, 'true');
        }
        $("#multiInput").dialog("close");
    } catch (e) {

    } finally {
        nRow = bUse = data = null;
    }

}

//다양한 select 옵션이 있는 컬럼을 위한 이벤트
function mInputData1() {

    var nRow = datagrid1.getRow();
    var data = $('#bUse1').val();
    try {
        datagrid1.setCellData(nRow, 2, data);
        if (data == 'none') {
            datagrid1.setCellData(nRow, 0, 'false');
        } else {
            datagrid1.setCellData(nRow, 0, 'true');
        }
        $("#multiInput1").dialog("close");
        $('#bUse1').remove();
        $('#inputButton4').remove();
    } catch (e) {

    } finally {
        nRow = data = null;
    }

}

function reCreateGrid() {

    SBGridProperties = {};
    var datagrid;

    //체크된 데이터들을 찾아서 SBGridProperties로 넘겨주는 방법
    for (var i = 1; i < datagrid1.getRows(); i++) {

        var checkCell = datagrid1.getCellData(i, 0);
        var colName = datagrid1.getCellData(i, 1);
        var inData = datagrid1.getCellData(i, 2);

        var pIdChk = datagrid1.getCellData(1, 0);
        var pIdValue = datagrid1.getCellData(1, 2);
        var idChk = datagrid1.getCellData(2, 0);
        var idValue = datagrid1.getCellData(2, 2);
        var jsonChk = datagrid1.getCellData(3, 0);
        var jsonValue = datagrid1.getCellData(3, 2);

        //필수 입력 값이 없으면 다음 단계로 진행되지 않게 설정
        if (pIdChk === 'false' || pIdValue === '' || idChk === 'false' || idValue === '' || jsonChk === 'false' || jsonValue === '') {
            alert("parentid, id, jsonref는 필수 입력 값입니다.");
            break;
        } else if (checkCell === 'true' && inData !== '') {
            //check가 되어 있는 값만 가지고 오겠다 라고 하는 if문
            switch (colName) {
                //입력된 데이터를 받으면 되는 속성들
                case 'parentid':
                case 'id':
                case 'backcoloralternate':
                case 'emptyrecords':
                case 'selectmode':
                case 'extendlastcol':
                case 'explorerbar':
                case 'mergecells':
				case 'rowheaderbackcoloralternate':
                case 'mergecellsfixedrows':
				case 'emptyrecordsfontstyle':
                case 'rowdatatype':
                case 'tooltiptype':
                    SBGridProperties[colName] = inData;
                    break;
                //입력된 데이터에 JSON.parse가 필요한 속성들
				case 'rowheader':
                case 'showselectedcellsinfo':
                case 'rowheaderwidth':
                case 'rowheadercaption':
				case 'finddata':
                    SBGridProperties[colName] = JSON.parse(inData);
                    break;

				case 'jsonref':
					SBGridProperties[colName] = 'ct_data.resources';
					var data = datagrid1.getCellData(3, 2);
					if(data=='ct_data.resources'){

					} else {
						if(inData.indexOf("[") < 0){
							inData = "["+inData+"]";
						}
						var _data = JSON.parse(inData);
						ct_data= {
								"resources":
									_data
								}
					}
                    break;

                    //boolean 타입으로 설정해야 하는 속성들
                case 'waitingui':
                case 'ellipsis':
                case 'allowselection':
                case 'allowuserresize':
                case 'oneclickedit':
                case 'rowdragmove':
                case 'whitespacemerge':
                case 'tooltip':
                case 'usemultisorting':
                case 'allowcopy':
                case 'disabled':
                case 'allowpaste':
                case 'limitscrollrow':
                case 'headermark':
                case 'automerge':
				case 'datamergefalseskip':
                case 'locale' :
                case 'scrollbubbling':
                case 'showtotalrows':
                case 'emptycellonpaste':
                    if (inData === 'true') {
                        SBGridProperties[colName] = true;
                    } else {
                        SBGridProperties[colName] = false;
                    }
                    break;

                case 'paging':
                    var strArray = inData.split(',');
                    var obj = {
                        'type': strArray[0].split(':')[1],
                        'count': parseInt(strArray[1].split(':')[1]),
                        'size': parseInt(strArray[2].split(':')[1])
                    };
                    SBGridProperties.paging = obj;
                    break;

                    //입력 값을 숫자로 받아야 하는 컬럼속성
                case 'alternatecycle':
                case 'frozenrows':
                case 'frozenbottomrows':
                case 'frozencols':
                case 'fixedcols':
				case 'resizinginterval':
				case 'fixedrowheight':
                case 'rowheight':
                    SBGridProperties[colName] = parseInt(inData);
                    break;

                    //px을 기본 설정에 넣어줄 속성들
                case 'width':
                case 'height':
                    //숫자만 입력했을 경우 기본 값으로 px을 넣어주기 위한 방법
                    if (inData.indexOf('px') == -1 || inData.indexOf('%') == -1) {
                        SBGridProperties[colName] = inData + 'px';
                    } else {
                        SBGridProperties[colName] = inData;
                    }
                    break;
            } //end of switch
        } else if (checkCell === 'true' && inData === '') {
            //end of if -> 어떤값을 넣을지 확인하는 if문
            var lastChk = confirm(colName + " 설정 값이 없습니다.\n설정하시겠습니까?");
            if (lastChk == true) {
                datagrid1.setTopRow(i);
            } else {
                datagrid1.setCellData(i, 0, 'false');
            }

        }
    } //end of for
    createGrid();
} //end of function reCreateGrid
