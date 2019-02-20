
//inputModal 쓰는 속성
var arrMessage = {
	parentid : '그리드를 삽입할 DIV 엘리먼트 ID를 설정합니다.',
	id : '생성된 그리드 객체의 Id입니다.',
	jsonref : '그리드에 표시될 json DATA를 입력 합니다. key & value는 " " 로 넣어주세요.',
	backcoloralternate : '짝수행의 배경색을 설정합니다.',
	alternatecycle : 'backcoloralternate 속성의 반복 주기를 설정합니다.',
	emptyrecords : '표시할 데이터가 없을때 표시할 메세지를 설정합니다.',
	width : '그리드의 width값을 설정합니다.',
	height : '그리드의 height값을 설정합니다.',
	fixedrowheight : '캡션영역의 높이를 설정합니다.',
	rowheight : '각 행의 Height값을 설정합니다.',
	frozenrows : '상단을 기준으로 고정시킬 행의 갯수를 설정합니다.',
	frozenbottomrows : '하단을 기준으로 고정시킬 행의 갯수를 설정합니다.',
	frozencols : '왼쪽을 기준으로 고정시킬 열의 갯수를 설정합니다.',
	usemultisorting : '여러 열에 다중 정렬기능을 설정합니다.',
	rowdatatype : '그리드의 데이터 형태를 설정합니다.',
	rowheaderbackcoloralternate : '그리드내 rowheader열의 짝수행의 배경색을 설정합니다.',
	emptyrecordsfontstyle : '데이터가 없을 경우 나타나는 그리드 내의 문구에 스타일을 설정합니다.',
	resizinginterval : '사용자의 브라우저 크기에 따라서 그리드의 너비 변경 대기 시간을 설정합니다.',
	rowheader : '그리드 첫 번째 열에 fixedcol 추가 후 행에 표시할 타입을 설정합니다.(배열로 선언 시 다중 rowheader 사용)',
	rowheaderwidth : 'rowheader가 설정 되어 있을때 해당 rowheader의 너비를 설정하는 속성입니다.',
    rowheadercaption : 'rowheader가 설정되어 있을때 해당 rowheader 컬럼의 caption명을 설정합니다.',
	finddata : 'Ctrl + F 를 이용하여 그리드 데이터 찾기 기능 UI를 설정합니다.',
    showselectedcellsinfo : '그리드 하단에 보여줄 선택된 셀의 count, sum, avg 정보를 설정합니다.'
};

//placeholder 설정
var plcMessage = {
	parentid 			: 'ex) SBGridArea',
	id 					: 'ex) datagrid',
	jsonref 			: 'ex) {"name" : "dbs", "nation":"Korea"}',
	backcoloralternate 	: 'ex) #808080',
	alternatecycle 		: 'ex) 3',
	emptyrecords 		: 'ex) 데이터가 없습니다.',
	width 				: 'ex) 250px',
	height 				: 'ex) 250px',
	fixedrowheight		: 'ex) 25',
	rowheight 			: 'ex) 25',
	frozenrows 			: 'ex) 3',
	frozenbottomrows 	: 'ex) 3',
	frozencols 			: 'ex) 2',
	rowdatatype			: 'ex) array',
	rowheaderbackcoloralternate : 'ex) #808080',
	emptyrecordsfontstyle : 'ex) {color : #f00; font-size : 20px;}',
	resizinginterval : 'ex) 1000',
	rowheader : 'ex) "seq" || ["seq", "select"]',
	rowheaderwidth : 'ex) {"seq" : "100px"}',
    rowheadercaption : 'ex) {"seq" : "순번"}',
	finddata : 'ex) {"casesense" : false, "fullmatch" : false, "label" : "all"}',
    showselectedcellsinfo : 'ex) ["count", "sum", "avg"]'
};

//bModal 쓰는 속성
var booleanMessage = {
	waitingui : '그리드 잠김 UI 표시 여부를 설정합니다.',
	ellipsis : '그리드에 말줄임 기능을 사용하도록 설정합니다.',
	allowselection : '다중 선택할 수 없도록 설정합니다',
	allowuserresize : '열너비를 사용자가 조정을 할 수 있는지 여부를 설정합니다.',
	oneclickedit : 'input type일 때 원클릭으로 editMode로 변경할지 여부를 설정합니다.',
	disabled : '그리드를 ReadOnly 상태로 설정한다.',
	rowdragmove : '마우스  Drag and Drop을 이용한 행 이동 기능 사용 여부를 설정합니다.',
	whitespacemerge : '내용이 없는 셀을 병합 시킬지 여부를 설정합니다.',
	tooltip : '각 셀마다 해당 셀의 내용을 툴팁으로 설정합니다.',
	allowcopy : '그리드의 데이터를 복사 가능 여부를 설정합니다.',
	allowpaste : '그리드에 데이터 붙여넣기 가능 여부를 설정합니다.',
	limitscrollrow : '세로 스크롤 버튼 클릭시 그리드 행의 이동 개수를 설정합니다.',
	headermark : 'selectmode가 free일 때 셀 클릭시 fixedrow, rowheader 영역의 해당 index에 하이라이트 여부를 설정합니다.',
	automerge : '병합관련 메소드 사용시 바로 병합을 진행할지 여부를 설정합니다.',
	datamergefalseskip : '병합에서 제외할 컬럼을 설정합니다.',
	locale : '그리드 다국어 지원 기능 사용 여부를 설정합니다.',
	scrollbubbling : '그리드 영역의 스크롤이 최상단이나/최하단까지 이동했을 때 마우스휠 이벤트 발생시 브라우저스크롤 이동 여부를 설정합니다.',
	showtotalrows : '그리드 하단에 전체 행의 개수를 표시할지 여부를 설정합니다.',
	emptycellonpaste : 'date format에 맞지 않는 데이터를 빈값으로 붙여넣을지 여부를 설정합니다.'
};

//multiInput1 Modal쓰는 속성
var selectObj = {
	extendlastcol : {
					//json 형태로 만든 데이터 값
					message : '그리드의 여백이 보이지 않도록 우측 마지막 열의 너비 확장 여부를 설정합니다.',
					arr :[{ value : 'scroll' , text : 'scroll' } , { value : 'none' , text : '미사용' }]
	},
	explorerbar : {
					message :'헤더영역을 클릭했을때 해당 열을 정렬 혹은 위치변경 하도록 설정합니다.',
					arr :[{ value : 'sort' , text : 'sort' } , { value : 'move' , text : 'move' }, { value : 'sortmove' , text : 'sortmove' }]
	},
	mergecells : {
					message :'같은 내용의 셀의 병합 여부를 설정합니다.',
					arr :[{ value : 'byrow' , text : 'byrow' } , { value : 'bycol' , text : 'bycol' }, { value : 'byrowrec' , text : 'byrowrec' }, { value : 'bycolrec' , text : 'bycolrec' }, { value : 'byrestricrow' , text : 'byrestricrow' }, { value : 'byrestriccol' , text : 'byrestriccol' }]
	},
	mergecellsfixedrows : {
					message :'fixed row 영역의 병합 방법을 설정합니다.',
					arr :[{ value : 'byrow' , text : 'byrow' } , { value : 'bycol' , text : 'bycol' }, { value : 'byrowrec' , text : 'byrowrec' }, { value : 'bycolrec' , text : 'bycolrec' }, { value : 'byrestricrow' , text : 'byrestricrow' }, { value : 'byrestriccol' , text : 'byrestriccol' }]
	},
	selectmode : {
					message :'그리드내 데이터의 선택모드를 설정합니다.',
					arr :[{ value : 'byrow' , text : '행 단위' } , { value : 'free' , text : '셀 단위' }]
	},
	tooltiptype : {
					message :'툴팁에 표시되는 값을 설정합니다.',
					arr :[{ value : 'label', text : 'label로 표시'}, {value : 'value', text : 'value로 표시'}]
	}
};

var setTooltip = {
	data : [
		'그리드를 삽입할 DIV 엘리먼트 ID를 설정합니다.',
		'생성된 그리드 객체의 Id입니다.',
		'그리드에 표시될 데이터의 json경로를 설정합니다.',
		'그리드 잠김 UI 표시 여부를 설정합니다.',
		'그리드의 데이터 형태를 설정합니다.',
		'페이징 기능을 사용 할 수 있습니다.',
		'그리드에 말줄임 기능을 사용하도록 설정합니다.',
		'짝수행의 배경색을 설정합니다.',
		'그리드내 rowheader열의 짝수행의 배경색을 설정합니다.',
		'backcoloralternate 속성의 반복 주기를 설정합니다.',
		'표시할 데이터가 없을때 표시할 메세지를 설정합니다.',
		'데이터가 없을 경우 나타나는 그리드 내의 문구에 스타일을 설정합니다.',
		'다중 선택할 수 없도록 설정합니다',
		'그리드내 데이터의 선택모드를 설정합니다.',
		'각 열의 width값을 설정합니다.',
		'각 행의 height값을 설정합니다.',
		'사용자의 브라우저 크기에 따라서 그리드의 너비 변경 대기 시간을 설정합니다.',
		'캡션영역의 높이를 설정합니다.',
		'각 행의 Height값을 설정합니다.',
		'열너비를 사용자가 조정을 할 수 있는지 여부를 설정합니다.',
		'그리드의 여백이 보이지 않도록 우측 마지막 열의 너비 확장 여부를 설정합니다.',
		//showscrollinfo : 받아야하는 값이 함수임으로 우선 제외
		//'그리드내 상하 스크롤을 통한 행 이동시 행 위치 정보를 표시할 수 있습니다.',
		'세로 스크롤 버튼 클릭시 그리드 행의 이동 개수를 설정합니다.',
		'헤더영역을 클릭했을때 해당 열을 정렬 혹은 위치변경 하도록 설정합니다.',
		'상단을 기준으로 고정시킬 행의 갯수를 설정합니다.',
		'하단을 기준으로 고정시킬 행의 갯수를 설정합니다.',
		'왼쪽을 기준으로 고정시킬 열의 갯수를 설정합니다.',
		'input type일 때 원클릭으로 editMode로 변경할지 여부를 설정합니다.',
		'그리드를 ReadOnly 상태로 설정한다.',
		'마우스  Drag and Drop을 이용한 행 이동 기능 사용 여부를 설정합니다.',
		'같은 내용의 셀의 병합 여부를 설정합니다.',
		'병합관련 메소드 사용시 바로 병합을 진행할지 여부를 설정합니다.',
		'병합에서 제외할 컬럼을 설정합니다.',
		'내용이 없는 셀을 병할 시킬지 여부를 설정합니다.',
		'fixed row 영역의 병합 방법을 설정합니다.',
		'그리드 다국어 지원 기능 사용 여부를 설정합니다.',
		'각 셀마다 해당 셀의 내용을 툴팁으로 설정합니다.',
		'툴팁에 표시되는 값을 설정합니다.',
		'그리드 첫 번째 열에 fixedcol 추가 후 행에 표시할 타입을 설정합니다.(배열로 선언 시 다중 rowheader 사용)',
		'rowheader가 설정 되어 있을때 해당 rowheader의 너비를 설정합니다.',
		'rowheader가 설정되어 있을때 해당 rowheader 컬럼의 caption명을 설정합니다.',
		'여러 열에 다중 정렬기능을 설정합니다.',
		'그리드의 데이터를 복사 가능 여부를 설정합니다.',
		'그리드에 데이터 붙여넣기 가능 여부를 설정합니다.',
		'그리드의 필터링 기능 사용여부를 설정합니다.',
		'특정 데이터 값을 다른 값으로 치환하여 보여줍니다.',
		'데이터 앞뒤의 공백을 제거합니다.',
		'selectmode가 free일 때 셀 클릭시 fixedrow, rowheader 영역의 해당 index에 하이라이트 여부를 설정합니다.',
		'그리드 영역의 스크롤이 최상단이나/최하단까지 이동했을 때 마우스휠 이벤트 발생시 브라우저스크롤 이동 여부를 설정합니다.',
		'Ctrl + F 를 이용하여 그리드 데이터 찾기 기능 UI를 설정합니다.',
        '그리드 하단에 보여줄 선택된 셀의 count, sum, avg 정보를 설정합니다.',
		'그리드 하단에 전체 행의 개수를 표시할지 여부를 설정합니다.',
		'date format에 맞지 않는 데이터를 빈값으로 붙여넣을지 여부를 설정합니다.'
	]
};


function setTool(){
	for(var t = 0; t<=datagrid1.getRows(); t++){
		datagrid1.setCellTooltip(t+1, 1, setTooltip.data[t]+'');
		datagrid1.setCellTooltip(t+1, 2, setTooltip.data[t]+'');
	}
}
