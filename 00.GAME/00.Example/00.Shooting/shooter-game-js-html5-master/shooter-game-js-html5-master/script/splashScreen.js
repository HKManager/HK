/**
 * Shooter Game Project by Alex Gomes and Waleed Dogar
 * Last edited on 08/08/2014
 */


$(document).ready(function(){
    var spwidth = $().width;
    console.log(spwidth);
    $('#splashScreen').css({
        background:"url('assets/background/splashScreen.png')"
    });

})

function startGame(){
    $('body').css({
        'cursor':'url("http://www.cursor.cc/cursor/10/0/cursor.png"), auto'
    })
    $('#splashScreen').css({
        display:'none'
    })

    $.getScript("script/game.js");


}
