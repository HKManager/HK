/*
 *    Description : 우측 컬럼 파트 관련 부문
 *    Developed : 이희연
 *    Create Date : 02/17
 *    Modify Date : 03/13
 */

var typeInfos = [];
var colStyles = [];
var colFixedStyles = [];
var colFilterings = [];
var colFormats = [];
var colHiddens = [];
var colMerges = [];
var colAdditionals = [];
var typeTmps=[];
var dataTmp;
// 초기 컬럼에 대한 부문
function initColumns(gridDataObj) {
    var useIf = 0;
    if(typeof gridDataObj === 'string'){
        dataTmp = JSON.parse("["+gridDataObj+"]");
        //배열의 0번째에 키가 모여있어서 [0]으로 넣어준다.
        var keyData = _.uniq(_.keys(dataTmp[0]));
        colid=keyData.length;
        colcnt=keyData.length;
        useIf++;
    }else{
        //배열의 0번째에 키가 모여있어서 [0]으로 넣어준다.
        dataTmp = gridDataObj[0];
        var keyData = _.uniq(_.keys(dataTmp));
        colid=keyData.length;
        colcnt=keyData.length;
    }
    for (var i = 1; i <= colcnt; i++) {
        $('#field').append('<div id="colarea_' + i + '">');
        $('#field').append('<input type="text" class="colcptn commonInput colmargin" name="colcptn" id="colcptn_' + i + '" style="width : 12.5vw;" value="' + keyData[i-1] + '"/>');
        $('#field').append('<input type="text" class="colref commonInput colmargin" name="colref" id="colref_' + i + '" style="width : 12.5vw;" value="' + keyData[i-1] + '"/>');
        $('#field').append('<input type="text" class="colwidth selectInput width" name="colwidth" id="colwidth_' + i + '" style="width : 6vw;"/>');
        $('#field').append('<select class="widthtype inputSelect colmargin width" name="widthtype" id="widthtype_' + i + '" style="width : 3vw;">' +
                           '<option value="%" selected>%</option><option value="px">px</option></select>');
        $('#field').append('<select name="coltype" id="coltype_' + i + '" style="width : 9vw;" class="coltypeClass coltype commonSelect colmargin" >' +
                           '<option value="output">output</option>' +
                           '<option value="input">input</option><option value="combo">combo</option>' +
                           '<option value="inputcombo">inputcombo</option><option value="checkbox">checkbox</option>' +
                           '<option value="radio">radio</option><option value="datepicker">datepicker</option>' +
                           '<option value="inputdate">inputdate</option><option value="textarea">textarea</option>' +
                           '<option>image</option></select>');
        $('#field').append('<input type="button" value="타입속성" class="colAdditional colmargin" name="typeinfo" id="typeinfo_' + i + '" style="width : 6vw;" onclick="colTypeInfo(this)"  />');
        $('#field').append('<input type="button" value="컬럼속성" class="colAdditional" name="colAdditional" id="colAdditional_' + i + '" style="width : 6vw;" onclick="colAdditional(this)"  />');
        $('#field').append('<input type="button" value="-" class="delBtn minorBtn" style="margin-left:0.26vw;" name="delBtn" id="btn_' + i + '" onclick="deleteColumn(' + i + ')"/>');
        $('#field').append('</div>');
    }
    if(useIf===1){
        openModalEvent();
    }
}
function removeField(){
    $('#field').remove();	
    $('.fieldAdd').append('<div id="field"></div>');
}
//option change 이벤트
function colTypeInfo(thisId) {
    var uniqueSeq=thisId.id.substring(thisId.id.indexOf('_') + 1, thisId.id.length);
    var coltype=$("#coltype_"+uniqueSeq+" option:selected").val();
    var tf = false;
    $("#inModal").dialog("close");
    $("#outModal").dialog("close");
    $("#comboModal").dialog("close");
    $("#checkModal").dialog("close");
    $("#dateModal").dialog("close");
    $("#imageModal").dialog("close");

    switch (coltype) {
        case 'output':
            if (typeInfos.length == 0) {
                $("#outModal").dialog("open");
                $("#tmpOutModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        if (typeInfos[i].mask != null) {
                            $('#outputAlias').val(typeInfos[i].mask['alias']);
                            $('#outputUnmask').val(typeInfos[i].mask['unmaskvalue']);
                        }
                        $("#outModal").dialog("open");
                        $("#tmpOutModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#outputAlias').val('');
                    $('#outputUnmask option:eq(0)').prop('selected', true);
                    $("#outModal").dialog("open");
                    $("#tmpOutModalId").val(uniqueSeq);
                }
            }
            $('#outP').text('# OutPut Type 설정');
            break;

        case 'input':
            if (typeInfos.length == 0) {
                $("#inModal").dialog("open");
                $("#tmpInModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#inputMaxLength').val(typeInfos[i].maxlength);
                        $('#inputRoundMode').val(typeInfos[i].roundMode);
                        $('#inputRoundPosition').val(typeInfos[i].roundPosition);
                        $('#inputAutoNext').val(typeInfos[i].autonext);
                        $('#inputAlias').val(typeInfos[i].mask['alias']);
                        $('#inputUnmask').val(typeInfos[i].mask['unmaskvalue']);
                        $("#inModal").dialog("open");
                        $("#tmpInModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#inputMaxLength').val('');
                    $('#inputRoundMode option:eq(0)').prop('selected', true);
                    $('#inputRoundPosition').val('');
                    $('#inputAutoNext option:eq(0)').prop('selected', true);
                    $('#inputMaskAlias').val('');
                    $('#inputUnmask option:eq(0)').prop('selected', true);
                    $("#inModal").dialog("open");
                    $("#tmpInModalId").val(uniqueSeq);
                }
            }
            $('#inP').text('# Input Type 설정');
            break;

        case 'combo':
            if (typeInfos.length == 0) {
                $("#comboModal").dialog("open");
                $("#tmpCmbModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#comboRef').val('comboData');
                        $('#comboLabel').val('name');
                        $('#comboValue').val('code');
                        // $('#comboRef').val(typeInfos[i].ref);
                        // $('#comboLabel').val(typeInfos[i].label);
                        // $('#comboValue').val(typeInfos[i].value);
                        $('#comboItem').val(typeInfos[i].itemcount);
                        $('#comboDisplay').val(typeInfos[i].displayui);
                        $("#comboModal").dialog("open");
                        $("#tmpCmbModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    // $('#comboRef').val('');
                    // $('#comboLabel').val('');
                    // $('#comboValue').val('');
                    // $('#comboItem').val('');
                    $('#comboDisplay option:eq(0)').prop('selected', true);
                    $("#comboModal").dialog("open");
                    $("#tmpOutModalId").val(uniqueSeq);
                }
            }
            $('#comboP').text('# Combo Type 설정');
            break;
        case 'inputcombo':
            if (typeInfos.length == 0) {
                $("#comboModal").dialog("open");
                $("#tmpCmbModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#comboRef').val('comboData');
                        $('#comboLabel').val('name');
                        $('#comboValue').val('code');
                        // $('#comboRef').val(typeInfos[i].ref);
                        // $('#comboLabel').val(typeInfos[i].label);
                        // $('#comboValue').val(typeInfos[i].value);
                        $('#comboItem').val(typeInfos[i].itemcount);
                        $('#comboDisplay').val(typeInfos[i].displayui);
                        $("#comboModal").dialog("open");
                        $("#tmpCmbModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    // $('#comboRef').val('');
                    // $('#comboLabel').val('');
                    // $('#comboValue').val('');
                    // $('#comboItem').val('');
                    $('#comboDisplay option:eq(0)').prop('selected', true);
                    $("#comboModal").dialog("open");
                    $("#tmpOutModalId").val(uniqueSeq);
                }
            }
            $('#comboP').text('# InputCombo Type 설정');
            break;
        case 'checkbox':
            if (typeInfos.length == 0) {
                $("#checkModal").dialog("open");
                $("#tmpChkModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#checkedValue').val(typeInfos[i].checkedvalue);
                        $("#checkModal").dialog("open");
                        $("#tmpChkModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#checkedValue option:eq(0)').prop('selected', true);
                    $("#checkModal").dialog("open");
                    $("#tmpChkModalId").val(uniqueSeq);
                }
            }
            $('#checkP').text('# CheckBox Type 설정');
            break;
        case 'radio':
            if (typeInfos.length == 0) {
                $("#checkModal").dialog("open");
                $("#tmpChkModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#checkedValue').val(typeInfos[i].checkedvalue);
                        $("#checkModal").dialog("open");
                        $("#tmpChkModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#checkedValue option:eq(0)').prop('selected', true);
                    $("#checkModal").dialog("open");
                    $("#tmpChkModalId").val(uniqueSeq);
                }
            }
            $('#checkP').text('# Radio Type 설정');
            break;
        case 'datepicker':
            if (typeInfos.length == 0) {
                $("#dateModal").dialog("open");
                $("#tmpDateModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#dateLocale').val(typeInfos[i].locale);
                        $('#dateFormat').val(typeInfos[i].dateformat);
                        $('#dateClear').val(typeInfos[i].clearbutton);
                        $('#dateMultiple').val(typeInfos[i].multiple);
                        $("#dateModal").dialog("open");
                        $("#tmpDateModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#dateLocale').val('');
                    $('#dateFormat').val('');
                    $('#dateClear option:eq(0)').prop('selected', true);
                    $('#dateMultiple').val('');
                    $("#dateModal").dialog("open");
                    $("#tmpDateModalId").val(uniqueSeq);
                }
            }
            $('#dateP').text('# DatePicker Type 설정');
            break;
        case 'inputdate':
            if (typeInfos.length == 0) {
                $("#dateModal").dialog("open");
                $("#tmpDateModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        $('#dateLocale').val(typeInfos[i].locale);
                        $('#dateFormat').val(typeInfos[i].dateformat);
                        $('#dateClear').val(typeInfos[i].clearbutton);
                        $('#dateMultiple').val(typeInfos[i].multiple);
                        $("#dateModal").dialog("open");
                        $("#tmpDateModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#dateLocale').val('');
                    $('#dateFormat').val('');
                    $('#dateClear option:eq(0)').prop('selected', true);
                    $('#dateMultiple').val('');
                    $("#dateModal").dialog("open");
                    $("#tmpDateModalId").val(uniqueSeq);
                }
            }
            $('#dateP').text('# InputDate Type 설정');
            break;
        case 'image':
            if (typeInfos.length == 0) {
                $("#imageModal").dialog("open");
                $("#tmpImgModalId").val(uniqueSeq);
            } else {
                for (var i = 0; i < typeInfos.length; i++) {
                    if (uniqueSeq == typeInfos[i].idx) {
                        var ih = typeInfos[i].imageheight;
                        var iw = typeInfos[i].imagewidth;
                        var is = typeInfos[i].imagestyle;
                        var ic = typeInfos[i].imageclick;
                        var iu = typeInfos[i].imageuri;
                        var ie = typeInfos[i].imageerroruri;
                        $('#imageHeight').val(typeInfos[i].imageheight);
                        $('#imageWidth').val(typeInfos[i].imagewidth);
                        $('#imageStyle').val(typeInfos[i].imagestyle);
                        $('#imageClick').val(typeInfos[i].imageclick);
                        $('#imageClick').val(typeInfos[i].imageuri);
                        $('#errorUri').val(typeInfos[i].imageerroruri);
                        $("#imageModal").dialog("open");
                        $("#tmpImgModalId").val(uniqueSeq);
                        tf = false;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    $('#imageHeight').val('');
                    $('#imageWidth').val('');
                    $('#imageStyle').val('');
                    $('#imageClick').val('');
                    $('#imageClick').val('');
                    $('#errorUri').val('');
                    $("#imageModal").dialog("open");
                    $("#tmpImgModalId").val(uniqueSeq);
                }
            }
            $('#imageP').text('# Image Type 설정');
            break;
        case 'textarea':
            var textTypeInfo = {
                idx: uniqueSeq
            };
            if (typeInfos.length == 0) {
                typeInfos.push(textTypeInfo);
            } else {
                var tf = false;
                for (i = 0; i < typeInfos.length; i++) {
                    if (typeInfos[i].idx == uniqueSeq) {
                        typeInfos.splice(i, 1);
                        typeInfos.push(textTypeInfo);
                        tf = false;
                        break;
                    } else {
                        tf = true;
                    }
                }
                if (tf == true) {
                    typeInfos.push(textTypeInfo);
                }
            }
            break;

                   }
}

function openModalEvent() {
    $("#outModal").dialog({
        title: 'Column Type 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+200",
            at: "right-50 top+30",
            of: document
        },
        width: 400,
        height: 250,
        buttons: [
            {
                text: "OK",
                //클릭이벤트발생시 동작
                click: function () {
                    var idx = Number($(this).find("[id=tmpOutModalId]").val());
                    var outputTypeInfo = {
                        idx: idx,
                        mask: {
                            alias: $('#outputAlias').val(),
                            unmaskvalue: Number($('#outputUnmask').val())
                        }
                    };
                    if ($('#outputAlias').val() == '' && $('#outputUnmask').val() == 2) {
                        delete outputTypeInfo;
                    } else {
                        if ($('#outputAlias').val() == '') delete outputTypeInfo.mask['alias'];
                        if ($('#outputUnmask').val() == 2) {
                            delete outputTypeInfo.mask['unmaskvalue'];
                        } else {
                            outputTypeInfo.mask['unmaskvalue'] = Boolean(outputTypeInfo.mask['unmaskvalue']);
                        }
                    }
                    if (typeInfos.length == 0) {
                        typeInfos.push(outputTypeInfo);
                    } else {
                        var tf = false;
                        for (i = 0; i < typeInfos.length; i++) {
                            if (typeInfos[i].idx == idx) {
                                typeInfos.splice(i, 1);
                                typeInfos.push(outputTypeInfo);
                                tf = false;
                                break;
                            } else {
                                tf = true;
                            }
                        }
                        if (tf == true) {
                            typeInfos.push(outputTypeInfo);
                        }
                    }
                    copyModal(idx, outputTypeInfo, "outputNm");
                    $(this).dialog("close");
                }
            },
            { //버튼텍스트
                text: "Cancel",
                //클릭이벤트발생시 동작
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
    $("#inModal").dialog({
        title: 'Column Type 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+200",
            at: "right-50 top+30",
            of: document
        },
        width: 400,
        height: 420,
        buttons: [
            { //버튼텍스트
                text: "OK",
                //클릭이벤트발생시 동작
                click: function () {
                    var idx = Number($(this).find("[id=tmpInModalId]").val());
                    var inputTypeInfo = {
                        idx: idx,
                        maxlength: Number($('#inputMaxLength').val()),
                        roundMode: $('#inputRoundMode').val(),
                        roundPositon: Number($('#inputRoundPosition').val()),
                        autonext: Number($('#inputAutoNext').val()),
                        mask: {
                            alias: $('#inputMaskAlias').val(),
                            unmaskvalue: Number($('#inputUnmask').val())
                        }
                    };
                    if ($('#inputMaxLength').val() == '') {
                        delete inputTypeInfo.maxlength;
                    }
                    if ($('#inputRoundMode').val() == '2') {
                        delete inputTypeInfo.roundMode;
                    }
                    if ($('#inputRoundPosition').val() == '') {
                        delete inputTypeInfo.roundPositon;
                    }
                    if ($('#inputAutoNext').val() == 2) {
                        delete inputTypeInfo.autonext;
                    }
                    if ($('#inputMaskAlias').val() == '' && $('#inputUnmask').val() == 2) {
                        delete inputTypeInfo.mask;
                    } else {
                        if ($('#inputMaskAlias').val() == '') delete inputTypeInfo.mask['alias'];
                        if ($('#inputUnmask').val() == 2) {
                            delete inputTypeInfo.mask['unmaskvalue'];
                        } else {
                            inputTypeInfo.mask['unmaskvalue'] = Boolean(inputTypeInfo.mask['unmaskvalue']);
                        }
                    }
                    if (typeInfos.length == 0) {
                        typeInfos.push(inputTypeInfo);
                    } else {
                        var tf = false;
                        for (i = 0; i < typeInfos.length; i++) {
                            if (typeInfos[i].idx == idx) {
                                typeInfos.splice(i, 1);
                                if (Object.keys(inputTypeInfo) == 'idx') {
                                    delete inputTypeInfo;
                                } else {
                                    typeInfos.push(inputTypeInfo);
                                }
                                tf = false;
                                break;
                            } else {
                                tf = true;
                            }
                        }
                        if (tf == true) {
                            typeInfos.push(inputTypeInfo);
                        }
                    }
                    copyModal(idx, inputTypeInfo, "inputNm");
                    $(this).dialog("close");
                }
            },
            { //버튼텍스트
                text: "Cancel",
                //클릭이벤트발생시 동작
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
    $("#comboModal").dialog({
        title: 'Column Type 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+200",
            at: "right-50 top+30",
            of: document
        },
        width: 400,
        height: 380,
        show: {
            effect: "blind",
            duration: 50
        },
        buttons: [
            { //버튼텍스트
                text: "OK",
                //클릭이벤트발생시 동작
                click: function () {
                    var idx = Number($(this).find("[id=tmpCmbModalId]").val());
                    var comboTypeInfo = {
                        idx: idx,
                        ref: $('#comboRef').val(),
                        label: $('#comboLabel').val(),
                        value: $('#comboValue').val(),
                        itemcount: $('#comboItem').val(),
                        displayui: Number($('#comboDisplay').val())
                    };
                    if ($('#comboItem').val() == '') {
                        delete comboTypeInfo.itemcount;
                    }
                    if ($('#comboDisplay').val() == 2) {
                        delete comboTypeInfo.displayui;
                    } else {
                        comboTypeInfo.displayui = Boolean(comboTypeInfo.displayui);
                    }
                    if ($('#comboRef').val() == '') {
                        delete comboTypeInfo.ref;
                    }
                    if ($('#comboLabel').val() == '') {
                        delete comboTypeInfo.label;
                    }
                    if ($('#comboValue').val() == '') {
                        delete comboTypeInfo.value;
                    }

                    if (typeInfos.length == 0) {
                        if (Object.keys(comboTypeInfo) == 'idx') {
                            delete comboTypeInfo;
                        } else {
                            typeInfos.push(comboTypeInfo);
                        }
                    } else {
                        var tf = false;
                        for (i = 0; i < typeInfos.length; i++) {
                            if (typeInfos[i].idx == idx) {
                                typeInfos.splice(i, 1);
                                if (Object.keys(comboTypeInfo) == 'idx') {
                                    delete comboTypeInfo;
                                } else {
                                    typeInfos.push(comboTypeInfo);
                                }
                                tf = false;
                                break;
                            } else {
                                tf = true;
                            }
                        }
                        if (tf == true) {
                            typeInfos.push(comboTypeInfo);
                        }
                    }
                    copyModal(idx, comboTypeInfo, "comboNm");
                    $(this).dialog("close");
                }
            },
            { //버튼텍스트
                text: "Cancel",
                //클릭이벤트발생시 동작
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#checkModal").dialog({
        title: 'Column Type 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+200",
            at: "right-50 top+30",
            of: document
        },
        width: 400,
        height: 200,
        show: {
            effect: "blind",
            duration: 50
        },
        buttons: [{
            //버튼텍스트
            text: "OK",
            //클릭이벤트발생시 동작
            click: function () {
                var idx = Number($(this).find("[id=tmpChkModalId]").val());
                var checkTypeInfo = {
                    idx: idx,
                    checkedvalue: Number($('#checkedValue').val())
                };
                if ($('#checkedValue').val() == 2) {
                    delete checkTypeInfo.checkedvalue;
                } else {
                    checkTypeInfo.checkedvalue = Boolean(checkTypeInfo.checkedvalue);
                }
                if (typeInfos.length == 0) {
                    typeInfos.push(checkTypeInfo);
                } else {
                    var tf = false;
                    for (i = 0; i < typeInfos.length; i++) {
                        if (typeInfos[i].idx == idx) {
                            typeInfos.splice(i, 1);
                            typeInfos.push(checkTypeInfo);
                            tf = false;
                            break;
                        } else {
                            tf = true;
                        }
                    }
                    if (tf == true) {
                        typeInfos.push(checkTypeInfo);
                    }
                }
                copyModal(idx, checkTypeInfo, "checkNm");
                $(this).dialog("close");
            }
        }, {
            //버튼텍스트
            text: "Cancel",
            //클릭이벤트발생시 동작
            click: function () {
                $(this).dialog("close");
            }
        }
                 ]
    });
    $("#dateModal").dialog({
        title: 'Column Type 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+200",
            at: "right-50 top+30",
            of: document
        },
        width: 400,
        height: 350,
        buttons: [{
            //버튼텍스트
            text: "OK",
            //클릭이벤트발생시 동작
            click: function () {
                var idx = Number($(this).find("[id=tmpDateModalId]").val());
                var dateTypeInfo = {
                    idx: idx,
                    locale: $('#dateLocale').val(),
                    dateformat: $('#dateFormat').val(),
                    clearbutton: Number($('#dateClear').val()),
                    multiple: $('#dateMultiple').val()
                };
                if ($('#dateLocale').val() == '') {
                    delete dateTypeInfo.locale;
                }
                if ($('#dateFormat').val() == '') {
                    delete dateTypeInfo.dateFormat;
                }
                if ($('#dateClear').val() == 2) {
                    delete dateTypeInfo.clearbutton;
                } else {
                    dateTypeInfo.clearbutton = Boolean(dateTypeInfo.clearbutton);
                }
                if ($('#dateMultiple').val() == '') {
                    delete dateTypeInfo.multiple;
                }
                if (typeInfos.length == 0) {
                    typeInfos.push(dateTypeInfo);
                } else {
                    var tf = false;
                    for (i = 0; i < typeInfos.length; i++) {
                        if (typeInfos[i].idx == idx) {
                            typeInfos.splice(i, 1);
                            typeInfos.push(dateTypeInfo);
                            tf = false;
                            break;
                        } else {
                            tf = true;
                        }
                    }
                    if (tf == true) {
                        typeInfos.push(dateTypeInfo);
                    }
                }
                copyModal(idx, dateTypeInfo, "dateNm");
                $(this).dialog("close");
            }
        }, {
            //버튼텍스트
            text: "Cancel",
            //클릭이벤트발생시 동작
            click: function () {
                $(this).dialog("close");
            }
        }
                 ]
    });
    $("#imageModal").dialog({
        title: 'Column Type 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+200",
            at: "right-50 top+30",
            of: document
        },
        width: 400,
        height: 480,
        buttons: [{
            //버튼텍스트
            text: "OK",
            //클릭이벤트발생시 동작
            click: function () {
                var idx = Number($(this).find("[id=tmpImgModalId]").val());
                var imageTypeInfo = {
                    idx: idx,
                    imagealt: $('#imageAlt').val(),
                    imageheight: $('#imageHeight').val(),
                    imagewidth: $('#imageWidth').val(),
                    imagestyle: $('#imageStyle').val(),
                    imageclick: $('#imageClick').val(),
                    imageuri: $('#imageUri').val(),
                    imageerroruri: $('#errorUri').val()
                };
                if ($('#imageAlt').val() == '') {
                    delete imageTypeInfo.imagealt;
                }
                if ($('#imageHeight').val() == '') {
                    delete imageTypeInfo.imageheight;
                }
                if ($('#imageWidth').val() == '') {
                    delete imageTypeInfo.imagewidth;
                }
                if ($('#imageStyle').val() == '') {
                    delete imageTypeInfo.imagestyle;
                }
                if ($('#imageClick').val() == '') {
                    delete imageTypeInfo.imageclick;
                }
                if ($('#imageUri').val() == '') {
                    delete imageTypeInfo.imageuri;
                }
                if ($('#errorUri').val() == '') {
                    delete imageTypeInfo.imageerroruri;
                }
                if (typeInfos.length == 0) {
                    typeInfos.push(imageTypeInfo);
                } else {
                    var tf = false;
                    for (i = 0; i < typeInfos.length; i++) {
                        if (typeInfos[i].idx == idx) {
                            typeInfos.splice(i, 1);
                            typeInfos.push(imageTypeInfo);
                            tf = false;
                            break;
                        } else {
                            tf = true;
                        }
                    }
                    if (tf == true) {
                        typeInfos.push(imageTypeInfo);
                    }
                }
                copyModal(idx, imageTypeInfo, "imageNm");
                $(this).dialog("close");
            }
        }, {
            //버튼텍스트
            text: "Cancel",
            //클릭이벤트발생시 동작
            click: function () {
                $(this).dialog("close");
            }
        }
                 ]
    });
    $("#additionalModal").dialog({
        title: '추가 컬럼 속성 입력',
        modal: true,
        autoOpen: false,
        position: {
            my: "right-50 top+100",
            at: "right-50 top+30",
            of: document
        },
        width: 450,
        height: 750,
        buttons: [{
            //버튼텍스트
            text: "OK",
            //클릭이벤트발생시 동작
            click: function () {
                var idx = Number($(this).find("[id=tmpAdditionalModalId]").val());
                var eachColAdditional = {
                    idx: idx,
                    style: $('#style').val(),
                    fixedstyle: $('#fixedstyle').val(),
                    usemode: $('#usemode').val(),
                    uitype: $('#uitype').val(),
                    type: $('#formatType').val(),
                    rule: $('#formatRule').val(),
                    hidden: $('#hidden').val(),
                    merge: $('#merge').val()
                };
                if ($('#style').val() == '') {
                    delete eachColAdditional.style;
                }
                if ($('#fixedstyle').val() == '') {
                    delete eachColAdditional.fixedstyle;
                }
                if ($('#usemode').val() == '2') {
                    delete eachColAdditional.usemode;
                }
                if ($('#uitype').val() == '2') {
                    delete eachColAdditional.uitype;
                }
                if ($('#formatType').val() == '2') {
                    delete eachColAdditional.type;
                }
                if ($('#formatRule').val() == '') {
                    delete eachColAdditional.rule;
                }
                if ($('#hidden').val() == '2') {
                    delete eachColAdditional.hidden;
                }
                if ($('#merge').val() == '2') {
                    delete eachColAdditional.merge;
                }
                if (colAdditionals.length == 0) {
                    colAdditionals.push(eachColAdditional);
                } else {
                    var ft = false;
                    for (i = 0; i < colAdditionals.length; i++) {
                        if (colAdditionals[i].idx == idx) {
                            colAdditionals.splice(i, 1);
                            colAdditionals.push(eachColAdditional);
                            ft = false;
                            break;
                        } else {
                            ft = true;
                        }
                    }
                    if (ft == true) {
                        colAdditionals.push(eachColAdditional);
                    }
                }
                $(this).dialog("close");
            }
        }, {
            //버튼텍스트
            text: "Cancel",
            //클릭이벤트발생시 동작
            click: function () {
                $(this).dialog("close");
            }
        }
                 ]
    });
}

function addColumn() {
    $('#field').append('<div id="colarea_' + (colid + 1) + '" class="sbgrid_GA sbgrid_GA_st sbgrid_common">');
    $('#field').append('<input type="text" class="colcptn commonInput colmargin" name="colcptn" id="colcptn_' + (colid + 1) + '" style="width : 12.5vw;"/>');
    $('#field').append('<input type="text" class="colref commonInput colmargin" name="colref" id="colref_' + (colid + 1) + '" style="width : 12.5vw;"/>');
    $('#field').append('<input type="text" class="colwidth selectInput width" name="colwidth" id="colwidth_' + (colid + 1) + '" style="width : 6vw;"/>');
    $('#field').append('<select name="widthtype" class="widthtype inputSelect colmargin width" id="widthtype_' + (colid + 1) + '" style="width : 3vw;">' +
                       '<option value="%">%</option><option value="px" selected>px</option></select>');
    $('#field').append('<select name="coltype" id="coltype_' + (colid + 1) + '" style="width : 9vw;" class="coltypeClass coltype commonSelect colmargin" >' +
                       '<option value="output">output</option>' +
                       '<option value="input">input</option><option value="combo">combo</option>' +
                       '<option value="inputcombo">inputcombo</option><option value="checkbox">checkbox</option>' +
                       '<option value="radio">radio</option><option value="datepicker">datepicker</option>' +
                       '<option value="inputdate">inputdate</option><option value="textarea">textarea</option>' +
                       '<option>image</option></select>');
    $('#field').append('<input type="button" value="타입속성" class="colAdditional colmargin" name="typeinfo" id="typeinfo_' + (colid + 1) + '" style="width : 6vw;" onclick="colTypeInfo(this)"  />');
    $('#field').append('<input type="button" value="컬럼속성" class="colAdditional" name="colAdditional" id="colAdditional_' + (colid + 1) + '" style="width : 6vw;" onclick="colAdditional(this)"  />');
    $('#field').append('<input type="button" value="-" class="delBtn minorBtn" style="margin-left:0.26vw;" name="delBtn" id="btn_' + (colid + 1) + '" onclick="deleteColumn(' + (colid + 1) + ')"/>');
    $('#field').append('</div>');
    colid++;
    colcnt++;
    openModalEvent();
}

//column 삭제
function deleteColumn(colid) {
    $('#colcptn_' + colid).remove();
    $('#colref_' + colid).remove();
    $('#colwidth_' + colid).remove();
    $('#widthtype_' + colid).remove();
    $('#coltype_' + colid).remove();
    $('#typeinfo_'+colid).remove();
    $('#colAdditional_' + colid).remove();
    $('#btn_' + colid).remove();
    colcnt--;
}

function colAdditional(thisId) {	
    var uniqueSeq = thisId.id.substring(thisId.id.indexOf('_') + 1, thisId.id.length);
    $("#inModal").dialog("close");
    $("#outModal").dialog("close");
    $("#comboModal").dialog("close");
    $("#checkModal").dialog("close");
    $("#dateModal").dialog("close");
    $("#imageModal").dialog("close");
    if (colAdditionals.length == 0) {
        $("#additionalModal").dialog("open");
        $("#tmpAdditionalModalId").val(uniqueSeq);
    } else {
        for (var i = 0; i < colAdditionals.length; i++) {
            if (uniqueSeq == colAdditionals[i].idx) {
                $('#style').val(colAdditionals[i].style);
                $('#fixedstyle').val(colAdditionals[i].fixedstyle);
                $('#formatRule').val(colAdditionals[i].rule);
                if (colAdditionals[i].usemode != null) {
                    $('#usemode').val(colAdditionals[i].usemode);
                }
                if (colAdditionals[i].uitype != null) {
                    $('#uitype').val(colAdditionals[i].uitype);
                }
                if (colAdditionals[i].type != null) {
                    $('#formatType').val(colAdditionals[i].type);
                }
                if (colAdditionals[i].hidden != null) {
                    $('#hidden').val(colAdditionals[i].hidden);
                }
                if (colAdditionals[i].merge != null) {
                    $('#merge').val(colAdditionals[i].merge);
                }
                $("#additionalModal").dialog("open");
                $("#tmpAdditionalModalId").val(uniqueSeq);
                ft = false;
            } else {
                ft = true;
            }
        }
        if (ft == true) {
            $('#style').val('');
            $('#fixedstyle').val('');
            $('#usemode option:eq(0)').prop('selected', true);
            $('#uitype option:eq(0)').prop('selected', true);
            $('#formatType option:eq(0)').prop('selected', true);
            $('#formatRule').val('');
            $('#hidden option:eq(0)').prop('selected', true);
            $('#merge option:eq(0)').prop('selected', true);
            $("#additionalModal").dialog("open");
            $("#tmpAdditionalModalId").val(uniqueSeq);
        }
    }
}


function copyModal(idx, typeInfo, selectedNm) {
    var arrInput = $('input[name="' + selectedNm + '"]');
    var arrSelect = $('select[name="' + selectedNm + '"]');
    var typetmp = {};

    for (i = 0; i < arrInput.length; i++) {
        var inputValue = $('input[name="' + selectedNm + '"]:eq(' + i + ')').val();
        var inputLabel = $('label[for=' + $('input[name="' + selectedNm + '"]:eq(' + i + ')').attr('id') + ']').text();
        typetmp.idx = idx;
        if (inputValue != '') {
            typetmp[inputLabel] = inputValue;
        }
    }
    for (i = 0; i < arrSelect.length; i++) {
        var selectValue = $('select[name="' + selectedNm + '"]:eq(' + i + ')').val();
        var selectLabel = $('label[for=' + $('select[name="' + selectedNm + '"]:eq(' + i + ')').attr('id') + ']').text();
        typetmp.idx = idx;
        if (selectValue != '2') {
            typetmp[selectLabel] = Boolean(Number(selectValue));
        }
    }
    for(i=0;i<typeTmps.length;i++){
        if(idx==typeTmps[i].idx){
            typeTmps.splice(i, 1);
        }
    }
    typeTmps.push(typetmp);
}
