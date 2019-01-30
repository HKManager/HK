function invokeCSCode(data) {
    try {
        invokeCSharpAction(data);
    }
    catch (err) {
    }
}

window.onload = function () {

    var Main = document.getElementById('divGame' );
    var height = document.getElementById('Main' ).offsetHeight;

    
    var top = (height - Main.offsetHeight)*0.5;

    Main.style.marginTop = top + "px";

    $("#btnGame").bind("touchstart", function (e) {
        $('#btnGame').attr("src", "img/btnGame_on.png");
    });

    $("#btnStudy").bind("touchend", function (e) {
        $('#btnStudy').attr("src", "img/btnStudy_on.png");
    });

    $("#btnManager").bind("touchstart", function (e) {
        $('#btnManager').attr("src", "img/btnManager_on.png");
    });

    $("#btnInfo").bind("touchend", function (e) {
        $('#btnInfo').attr("src", "img/btnInfo_on.png");
    });

    $("#btnSetting").bind("touchstart", function (e) {
        $('#btnSetting').attr("src", "img/btnSetting_on.png");
    });
};

function playBGM() {
    //var bgm = $('#sound');


    var bgm = document.getElementById("sound");

    if (bgm.paused) {
        bgm.play();
    }

    //bgm.addEventListener("loadstart", function () {
    //    alert("Starting to load video");
    //});

    //bgm.onloadstart  = function () {
        
    //}
}

function initPopup_Study() {
    $('a.login-window').click(function () {

        // Getting the variable's value from a link 
        var loginBox = $(this).attr('href');

        //Fade in the Popup and add close button
        $(loginBox).fadeIn(300);

        //Set the center alignment padding + border
        //var popMargTop = ($(loginBox).height() + 24) / 2;
        //var popMargLeft = ($(loginBox).width() + 24) / 2;

        //$(loginBox).css({
        //    'margin-top': -popMargTop,
        //    'margin-left': -popMargLeft
        //});

        // Add the mask to body
        $('body').append('<div id="mask"></div>');
        $('#mask').fadeIn(300);

        return false;
    });

    // When clicking on the button close or the mask layer the popup closed
    //$('a.close, #mask').live('click', function () {
    //    $('#mask , .login-popup').fadeOut(300, function () {
    //        $('#mask').remove();
    //    });
    //    return false;
    //});
}



// function downSnake() {
//     $('#btnSnake').attr("src", "img/btnSnake_on.png");
// }

// function upSnake() {
//     $('#btnSnake').attr("src", "img/btnSnake_off.png");
// }

// function downShooting() {
//     $('#btnShooting').attr("src", "img/btnShooting_on.png");
// }

// function upShooting() {
//     $('#btnShooting').attr("src", "img/btnShooting_off.png");
// }

// function downWallOut() {
//     $('#btnWallOut').attr("src", "img/btnWallOut_on.png");
// }

// function upWallOut() {
//     $('#btnWallOut').attr("src", "img/btnWallOut_off.png");
// }

// function downPuyoPuyo() {
//     $('#btnPuyoPuyo').attr("src", "img/btnPuyoPuyo_on.png");
// }

// function upPuyoPuyo() {
//     $('#btnPuyoPuyo').attr("src", "img/btnPuyoPuyo_off.png");
// }

// function hideDiv() {
//     $('#divGame').hide();
// }

function ShowGame() {
    window.location.href = "../game/BattleMonster/index.html";
}


function fillHeight() {
    var height = window.innerHeight > 0 ? window.innerHeight : screen.height;

    var divMap = document.getElementById('map');
    var divStudy = document.getElementById('divStudy');

    divStudy.style.height = height + "px";
    divMap.style.height = height + "px";
}


var mapChart = null;

function ShowStudy() {
    window.location.href = "../game/BattleMonster/index.html";
}

function ShowManager() {
    window.location.href = "../manager/WordBook/listWordBook.html";
}

function ShowInfo() {

}

function ShowSetting() {
    
}

function handleClick(event) {
    //alert(event.mapObject.id);
    //window.opener.location.href = "http://www.naver.com";

    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    var height = window.innerHeight > 0 ? window.innerHeight : screen.height;

    var box = document.getElementById('login-box');

    var x = ((width - box.style.width) * 0.5) -100;
    var y = ((height - box.style.height) * 0.5) - 75;

    box.style.left = x + "px";
    box.style.top = y + "px";

    $('#login-box').show();
}

function ShowSnake() {

    var obj = { handle: "06", view: "main", data: "snake" };

    var data = JSON.stringify(obj);

    //window.location.href = "../game/Snake/snake.html";
    invokeCSCode(data);
}

function ShowBlockOut() {
    window.location.href = "../game/BlockOut/example/game-breakout/index.html";
}

function ShowPuyoPuyo() {
    window.location.href = "../game/PuyoPuyo/example/game-samegame/index.html";
}

function ShowFlyBird() {
    //var obj = { handle: "06", view: "main", data: "flybird" };

    //var data = JSON.stringify(obj);

    //window.location.href = "../study/QuizQuiz/index.html";

    window.location.href = "../game/RacingCrazy/index.html";

    //invokeCSCode(data);
}

function ShowShooting() {
    window.location.href = "../game/BattleMonster/pokemon.html";
}

// - ���� ����




// - �н��� ����
function closePopupStudy() {
            $('#mask , .login-popup').fadeOut(300, function () {
            $('#mask').remove();
        });
        return false;
}

function ShowWordCard() {
    window.location.href = "../study/StudyRoom/index.html";
}

function ShowWordQuiz() {
    window.location.href = "../study/QuizQuiz/index.html";
}

function ShowWordTest() {
    window.location.href = "../study/WordTest/demo/index.html";
}

