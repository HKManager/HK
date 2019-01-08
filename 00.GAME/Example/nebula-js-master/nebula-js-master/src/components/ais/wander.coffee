Q.component 'aiWander',

  added: ->
    @entity.on "step", @, "step"

  step: (dt) ->
    if !@target or 50 > Q.distance(@entity.p.x, @entity.p.y, @target.p.x, @target.p.y)
      @target = p:
        x: Math.random() * 1000
        y: Math.random() * 1000

    targetAngle = @entity.p.angle - Q.angle @entity.p.x, @entity.p.y, @target.p.x, @target.p.y
    if targetAngle > 0
      @entity.trigger 'left', dt
    else
      @entity.trigger 'right', dt

    @entity.trigger 'up', dt

