function invokeCSCode(data) {
            try {
                invokeCSharpAction(data);
            }
            catch (err) {
            }
        }

        window.onload = function () {

            ShowGame();

            $("#btnSnake").bind("touchstart", function (e) {
                $('#btnSnake').attr("src", "img/btnSnake_on.png");
            });

            $("#btnSnake").bind("touchend", function (e) {
                $('#btnSnake').attr("src", "img/btnSnake_off.png");
            });

            $("#btnShooting").bind("touchstart", function (e) {
                $('#btnShooting').attr("src", "img/btnShooting_on.png");
            });

            $("#btnShooting").bind("touchend", function (e) {
                $('#btnShooting').attr("src", "img/btnShooting_off.png");
            });

            $("#btnWallOut").bind("touchstart", function (e) {
                $('#btnWallOut').attr("src", "img/btnWallOut_on.png");
            });

            $("#btnWallOut").bind("touchend", function (e) {
                $('#btnWallOut').attr("src", "img/btnWallOut_off.png");
            });

            $("#btnPuyoPuyo").bind("touchstart", function (e) {
                $('#btnPuyoPuyo').attr("src", "img/btnPuyoPuyo_on.png");
            });

            $("#btnPuyoPuyo").bind("touchend", function (e) {
                $('#btnPuyoPuyo').attr("src", "img/btnPuyoPuyo_off.png");
            });
        };

        function downSnake() {
            $('#btnSnake').attr("src", "img/btnSnake_on.png");
        }

        function upSnake() {
            $('#btnSnake').attr("src", "img/btnSnake_off.png");
        }

        function downShooting() {
            $('#btnShooting').attr("src", "img/btnShooting_on.png");
        }

        function upShooting() {
            $('#btnShooting').attr("src", "img/btnShooting_off.png");
        }

        function downWallOut() {
            $('#btnWallOut').attr("src", "img/btnWallOut_on.png");
        }

        function upWallOut() {
            $('#btnWallOut').attr("src", "img/btnWallOut_off.png");
        }

        function downPuyoPuyo() {
            $('#btnPuyoPuyo').attr("src", "img/btnPuyoPuyo_on.png");
        }

        function upPuyoPuyo() {
            $('#btnPuyoPuyo').attr("src", "img/btnPuyoPuyo_off.png");
        }

        function hideDiv() {
            $('#divGame').hide();
        }

        function ShowGame() {
            this.hideDiv();
            $('#divStudy').hide();
            $('#divGame').show();
            toggleNavView();
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

            fillHeight();

            //$(window).resize(fillHeight);

            $('#divGame').hide();
            this.hideDiv();
            $('#divStudy').show();
            toggleNavView();

            mapChart = AmCharts.makeChart("map", {
                "type": "map",
                "addClassNames": true,
                "fontSize": 15,
                "color": "#FFFFFF",
                "projection": "mercator",
                "backgroundAlpha": 1,
                "backgroundColor": "rgba(80,80,80,1)",
                "dataProvider": {
                    "map": "southKoreaLow",
                    "getAreasFromMap": true,
                    "areas": [
                        {
                            "id": "KR-41",
                            "title": "Gyeonggi",
                            "color": "rgba(75,216,181,0.8)"
                        },
                        {
                            "id": "KR-42",
                            "title": "Gangwon",
                            "color": "rgba(216,75,75,0.8)"
                        },
                        {
                            "id": "KR-47",
                            "title": "North Gyeongsang",
                            "color": "rgba(255,0,0,0.8)"
                        }
                    ]
                },
                "balloon": {
                    "horizontalPadding": 15,
                    "borderAlpha": 0,
                    "borderThickness": 1,
                    "verticalPadding": 15
                },
                "areasSettings": {
                    "color": "rgba(129,129,129,1)",
                    "outlineColor": "rgba(80,80,80,1)",
                    "rollOverOutlineColor": "rgba(80,80,80,1)",
                    "rollOverBrightness": 20,
                    "selectedBrightness": 20,
                    "selectable": true,
                    "unlistedAreasAlpha": 0,
                    "unlistedAreasOutlineAlpha": 0
                },
                "imagesSettings": {
                    "alpha": 1,
                    "color": "rgba(129,129,129,1)",
                    "outlineAlpha": 0,
                    "rollOverOutlineAlpha": 0,
                    "outlineColor": "rgba(80,80,80,1)",
                    "rollOverBrightness": 20,
                    "selectedBrightness": 20,
                    "selectable": true
                },
                "linesSettings": {
                    "color": "rgba(129,129,129,1)",
                    "selectable": true,
                    "rollOverBrightness": 20,
                    "selectedBrightness": 20
                },
                "zoomControl": {
                    "zoomControlEnabled": true,
                    "homeButtonEnabled": false,
                    "panControlEnabled": false,
                    "right": 38,
                    "bottom": 30,
                    "minZoomLevel": 0.25,
                    "gridHeight": 100,
                    "gridAlpha": 0.1,
                    "gridBackgroundAlpha": 0,
                    "gridColor": "#FFFFFF",
                    "draggerAlpha": 1,
                    "buttonCornerRadius": 2
                }
            });


            mapChart.allowClickOnSelectedObject = true;

            mapChart.addListener("clickMapObject", handleClick);
        }

        function handleClick(event) {
            alert(event.mapObject.id);
        }

        AmCharts.ready(function () {
            // add click listener
            
        });

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