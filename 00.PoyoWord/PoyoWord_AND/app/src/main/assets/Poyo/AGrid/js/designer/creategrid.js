var datagrid;

var _temp=[];
function createGrid() {
    $('#code_view pre').show();
    $('.attrDiv').remove();
    $('.attrCode br').remove();
    $('.attrCode span').remove();
    $('.columnCode').remove();
    $('.columnCode br').remove();
    $('.columnCode span').remove();
	$('.codeAdd').append('<span class="columnCode"></span>')
    ////////////////////////column 만들기1 시작////////////////////////////
    /////20170315 이희연 수정
    var colcptn=[];
    var colref=[];
    var colwidth=[];
    var widthtype=[];
    var coltype=[];
    var colstyle=[];			
    var colfixedstyle=[];
    var colfiltering=[];
    var colformat=[];
    var colhidden=[];
    var colmerge=[];
    var typeinfo=[];
    var typeinfotmp=[];
    var styletmp=[];
    var fixedstyletmp=[];
    var filteringtmp=[];
    var formattmp=[];
    var hiddentmp=[];
    var mergetmp=[];
    var eachcol;
    SBGridProperties.columns=[];
    for(var j=0;j<colcnt;j++){
        //caption얻기
        if($("input[name=colcptn]:eq("+j+")").val()!=undefined){
            colcptn.push($("input[name=colcptn]:eq("+j+")").val());
        }
        //ref얻기
        if($("input[name=colref]:eq("+j+")").val()!=undefined){
            colref.push($("input[name=colref]:eq("+j+")").val());
            var tmp = $("input[name=colref]:eq("+j+")").attr('id');
            tmp=tmp.substring(tmp.indexOf('_')+1,tmp.length);
        }			
        //width얻기
        if($("input[name=colwidth]:eq("+j+")").val()!=undefined){
            colwidth.push($("input[name=colwidth]:eq("+j+")").val());
        }				
        //widthtype, coltype얻기
        widthtype.push($("select[name=widthtype]:eq("+j+")").val());
        coltype.push($("select[name=coltype]:eq("+j+")").val());
        ///////0321 이희연 수정시작//////////
        for(var i=0;i<typeInfos.length;i++){
            if(typeInfos[i].idx==tmp){
                typeinfo[j]=typeInfos[i];
            }			
        }
        ////////0321 이희연 수정끝///////
        for(var i=0;i<colAdditionals.length;i++){
            if(colAdditionals[i].idx==tmp){
                styletmp[j]=colAdditionals[i].style;
                fixedstyletmp[j]=colAdditionals[i].fixedstyle;
                if(colAdditionals[i].usemode != null || colAdditionals[i].uitype!=null){
                    filteringtmp[j]={};
                    if(colAdditionals[i].usemode != null){
                        filteringtmp[j].usemode=Boolean(Number(colAdditionals[i].usemode));
                    }
                    if(colAdditionals[i].uitype!=null){
                        filteringtmp[j].uitype=colAdditionals[i].uitype;
                    }	
                }
                if(colAdditionals[i].type !=null || colAdditionals[i].rule !=null){
                    formattmp[j]={};
                    formattmp[j].type=colAdditionals[i].type;
                    formattmp[j].rule=colAdditionals[i].rule
                }
                if(colAdditionals[i].hidden !=null){
                    hiddentmp[j]=Boolean(Number(colAdditionals[i].hidden));
                }
                if(colAdditionals[i].merge !=null){
                    mergetmp[j]=Boolean(Number(colAdditionals[i].merge));
                }
            }
        }			
        //배열로 묶음
        eachcol = {};
        eachcol.caption=colcptn[j];
        eachcol.ref=colref[j];
		if(colwidth[j] !== ""){
			eachcol.width=colwidth[j]+widthtype[j];
		}
        eachcol.type=coltype[j];
        eachcol.typeinfo=typeinfo[j];
        eachcol.style=styletmp[j];
        eachcol.fixedstyle=fixedstyletmp[j];
        eachcol.filtering=filteringtmp[j];
        eachcol.format=formattmp[j];
        eachcol.hidden=hiddentmp[j];
        eachcol.merge=mergetmp[j];
        SBGridProperties.columns.push(eachcol);
    }
    var jsondata=JSON.stringify(SBGridProperties.columns);
    ///////////////////////////////column만들기1 끝////////////////////////////////

    datagrid = _SBGrid.create(SBGridProperties);
    var keys = Object.keys(SBGridProperties);
	
	//////keys에 필요없는 값이 들어올 경우 처리 해주는 구문(index변수에 해당 값을 추가해주면 됨.)//////
	var index = [
		keys.indexOf('multirowheader'),
		keys.indexOf('columns'),
		keys.indexOf('strRowHeader')
	];
	index.sort(function(a, b) { // 내림차순
		return b - a;
	});
	for(var idxLength=0; idxLength < index.length; idxLength++){
		if(index[idxLength] > -1){
			keys.splice(index[idxLength], 1);
		}
	}
	//////////////////////////////////////////종료///////////////////////////////////////////////
	
    for (var i = 0; i <= keys.length - 1; i++) {
		$('b').remove();
        $('#attr_preview').append('<div class="attrDiv">' + keys[i] + '</div>');
        if (keys[i] == 'columns') {} else {
            if (typeof (SBGridProperties[keys[i]]) == 'string') {
                $('.attrCode').append('<br/>        <span>SBGridProperties.' + keys[i] + '="' + SBGridProperties[keys[i]] + '";</span>');
            } else if (typeof (SBGridProperties[keys[i]]) == 'object') {
                $('.attrCode').append('<br/>        <span>SBGridProperties.' + keys[i] + '=' + JSON.stringify(SBGridProperties[keys[i]]) + ';</span>');
            }  else {
                $('.attrCode').append('<br/>        <span>SBGridProperties.' + keys[i] + '=' + SBGridProperties[keys[i]] + ';</span>');
            }
        }
    }
    $('#attr_preview').append('<div class="attrDiv">columns</div>');

    /////////////////////////////////////////이희연 수정1 시작/////////////////////////////////
    //위의 for문 안에 들어있으면 codeview부분에 columns가 중복 출력		
    var copyColumns = JSON.parse(JSON.stringify(SBGridProperties.columns));
	
    delete SBGridProperties.columns;
	
	for (var j = 0; j < copyColumns.length; j++) {
		for(var i=0;i<typeTmps.length;i++){
		
			//if(typeof copyColumns[j].typeinfo != "undefined" && copyColumns[j].typeinfo.idx==typeTmps[i].idx){
			if(typeof copyColumns[j].typeinfo != "undefined"){
				if(typeof typeTmps[i].idx != "undefined"){
					if(copyColumns[j].typeinfo.idx==typeTmps[i].idx){
						copyColumns[j].typeinfo=_.clone(typeTmps[i]);
						//console.log("delete");
						delete copyColumns[j].typeinfo.idx;
					
					}
				}
            }
        } 
		if (j == copyColumns.length - 1) {
			$('.columnCode').append('                <span>' + JSON.stringify(copyColumns[j]) + '</span>');
		} else if(j===0){
			$('.columnCode').append('<span>' + JSON.stringify(copyColumns[j]) + ',</span><br/>');
		} else {
			$('.columnCode').append('                <span>' + JSON.stringify(copyColumns[j]) + ',</span><br/>');
		}				
		
    }
    //////////////////////////////////////////이희연 수정1 끝////////////////////////////////
}
