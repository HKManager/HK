var selectLocItem = [];
var selectLocIndex = 0;
function SelectLocItem(e) {
    var code = e.find('input').val();
    var display = e.text();

    selectLocItem.push({
        CODE_SORT: selectLocIndex,
        CODE: code,
        CODE_NAME: display
    });

    selectLocIndex++;

    $('#locList').empty();

    ShowLocItem();

    //'<tr class="anime"><td class="center"><label class="pos-rel" style="width:50px;"><input type="radio" class="ace" name="checkClass" checked="checked"/><span class="lbl"></span></label></td>'
    //+ '<td id="class_register_dt" style="width:30%;text-align:center;font-size:small;">' + result[item].ENROLMENT_PAY_DT_STR + '</td>'
    //+ '<td id="class_nm" style="width:40%;text-align:center;font-size:small;">' + result[item].CLASS_NAME + '</td>'
    //+ '<td id="class_pay" style="width:30%;text-align:center;font-size:small;">' + result[item].ENROLMENT_PAY
    //+ '<input type="class_sn" style="display:none" value="' + result[item].CLASS_SN + '">'
    //+ '</td></tr>'

    //e.addclass("active");
    //alert(e.val());
}

function DeleteLocItem(e) {
    var CODE_SORT = e.find('input').val();

    var index = -1;

    for (var i = 0; i < selectLocItem.length; i++) {
        if (selectLocItem[i].CODE_SORT == CODE_SORT) {
            index = i;
        }
    }

    selectLocItem.splice(index, 1);

    ShowLocItem();
}

function ShowLocItem() {
    $('#locList').empty();

    for (var item = 0; item < selectLocItem.length; item++) {
        $('#locList:last').append(
            '<a style="text-align:center;font-size:small;" onclick="DeleteLocItem($(this));">' + selectLocItem[item].CODE_NAME
            + '<input style="display:none" value="' + selectLocItem[item].CODE_SORT + '>'
            + '</a>'
        );
    }
}