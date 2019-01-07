Quintus.Math = (Q) ->

  Q.random = (from, to) ->
    Math.floor Math.random() * (to-from + 1) + from

  Q.normalizeAngle = (angle) ->
    result = angle % 360
    loop
      break if result > 0
      result = result + 360

    result

  Q.angle = (fromX, fromY, toX, toY) ->
    distX   = toX - fromX
    distY   = toY - fromY
    radians = Math.atan2 distY, distX

    Q.radiansToDegrees(radians) - 90

  Q.distance = (fromX, fromY, toX = 0, toY = 0) ->
    Math.sqrt Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2)

  Q.offsetX = (angle, radius) ->
    Math.sin(angle / 180 * Math.PI) * radius

  Q.offsetY = (angle, radius) ->
    - Math.cos(angle / 180 * Math.PI) * radius

  Q.degreesToRadians = (degrees) ->
    degrees * (Math.PI / 180)

  Q.radiansToDegrees = (radians) ->
    radians * (180 / Math.PI)

