Stage(function(stage) {

  var Math = Stage.Math, Mouse = Stage.Mouse;

  stage.viewbox(200, 200);

  Stage.image('box').stretch().appendTo(stage).pin({
    width : 64,
    height : 64,
    align : 0.5
  }).on(Mouse.CLICK, function() {
    this.tween().pin({
      width : Math.random(32, 96),
      height : Math.random(32, 96)
    });
    return true;
  });

});
