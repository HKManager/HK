import Graphics from '../Graphics'

/**
 * ApexCharts YAxis Class for drawing Y-Axis.
 *
 * @module YAxis
 **/

export default class YAxis {
  constructor(ctx) {
    this.ctx = ctx
    this.w = ctx.w

    this.xaxisFontSize = this.w.config.xaxis.labels.style.fontSize
    this.axisFontFamily = this.w.config.xaxis.labels.style.fontFamily
    this.isBarHorizontal = !!(
      this.w.config.chart.type === 'bar' &&
      this.w.config.plotOptions.bar.horizontal
    )

    this.xaxisForeColors = this.w.config.xaxis.labels.style.colors

    this.xAxisoffX = 0
    if (this.w.config.xaxis.position === 'bottom') {
      this.xAxisoffX = this.w.globals.gridHeight
    }
  }

  drawYaxis(xyRatios, realIndex) {
    let w = this.w
    let graphics = new Graphics(this.ctx)

    let yaxisFontSize = w.config.yaxis[realIndex].labels.style.fontSize
    let yaxisFontFamily = w.config.yaxis[realIndex].labels.style.fontFamily

    let elYaxis = graphics.group({
      class: 'apexcharts-yaxis',
      rel: realIndex,
      transform: 'translate(' + w.globals.translateYAxisX[realIndex] + ', 0)'
    })

    if (!w.config.yaxis[realIndex].show) {
      return elYaxis
    }

    let elYaxisTexts = graphics.group({
      class: 'apexcharts-yaxis-texts-g'
    })

    elYaxis.add(elYaxisTexts)

    let tickAmount = w.globals.yAxisScale[realIndex].result.length - 1

    // labelsDivider is simply svg height/number of ticks
    let labelsDivider = w.globals.gridHeight / tickAmount + 0.1

    // initial label position = 0;
    let l = w.globals.translateY
    let lbFormatter = w.globals.yLabelFormatters[realIndex]

    if (w.config.yaxis[realIndex].labels.show) {
      for (let i = tickAmount; i >= 0; i--) {
        let val = w.globals.yAxisScale[realIndex].result[i]

        val = lbFormatter(val, i)

        let xPad = w.config.yaxis[realIndex].labels.padding
        if (w.config.yaxis[realIndex].opposite && w.config.yaxis.length !== 0) {
          xPad = xPad * -1
        }

        let label = graphics.drawText({
          x: xPad,
          y: l + tickAmount / 10 + w.config.yaxis[realIndex].labels.offsetY + 1,
          text: val,
          textAnchor: w.config.yaxis[realIndex].opposite ? 'start' : 'end',
          fontSize: yaxisFontSize,
          fontFamily: yaxisFontFamily,
          foreColor: w.config.yaxis[realIndex].labels.style.color,
          cssClass:
            'apexcharts-yaxis-label ' +
            w.config.yaxis[realIndex].labels.style.cssClass
        })
        elYaxisTexts.add(label)

        let labelRotatingCenter = graphics.rotateAroundCenter(label.node)
        if (w.config.yaxis[realIndex].labels.rotate !== 0) {
          label.node.setAttribute(
            'transform',
            `rotate(${w.config.yaxis[realIndex].labels.rotate} ${
              labelRotatingCenter.x
            } ${labelRotatingCenter.y})`
          )
        }
        l = l + labelsDivider
      }
    }

    if (w.config.yaxis[realIndex].title.text !== undefined) {
      let elYaxisTitle = graphics.group({
        class: 'apexcharts-yaxis-title'
      })

      let x = 0
      if (w.config.yaxis[realIndex].opposite) {
        x = w.globals.translateYAxisX[realIndex]
      }
      let elYAxisTitleText = graphics.drawText({
        x,
        y: w.globals.gridHeight / 2 + w.globals.translateY,
        text: w.config.yaxis[realIndex].title.text,
        textAnchor: 'end',
        foreColor: w.config.yaxis[realIndex].title.style.color,
        fontSize: w.config.yaxis[realIndex].title.style.fontSize,
        fontFamily: w.config.yaxis[realIndex].title.style.fontFamily,
        cssClass:
          'apexcharts-yaxis-title-text ' +
          w.config.yaxis[realIndex].title.style.cssClass
      })

      elYaxisTitle.add(elYAxisTitleText)

      elYaxis.add(elYaxisTitle)
    }

    let axisBorder = w.config.yaxis[realIndex].axisBorder
    if (axisBorder.show) {
      let x = 31 + axisBorder.offsetX
      if (w.config.yaxis[realIndex].opposite) {
        x = -31 - axisBorder.offsetX
      }

      let elVerticalLine = graphics.drawLine(
        x,
        w.globals.translateY + axisBorder.offsetY - 2,
        x,
        w.globals.gridHeight + w.globals.translateY + axisBorder.offsetY + 2,
        axisBorder.color
      )

      elYaxis.add(elVerticalLine)

      this.drawAxisTicks(
        x,
        tickAmount,
        axisBorder,
        w.config.yaxis[realIndex].axisTicks,
        realIndex,
        labelsDivider,
        elYaxis
      )
    }

    return elYaxis
  }

  // This actually becomes horizonal axis (for bar charts)
  drawYaxisInversed(realIndex) {
    let w = this.w
    let graphics = new Graphics(this.ctx)

    let elXaxis = graphics.group({
      class: 'apexcharts-xaxis apexcharts-yaxis-inversed'
    })

    let elXaxisTexts = graphics.group({
      class: 'apexcharts-xaxis-texts-g',
      transform: `translate(${w.globals.translateXAxisX}, ${
        w.globals.translateXAxisY
      })`
    })

    elXaxis.add(elXaxisTexts)

    let tickAmount = w.globals.yAxisScale[realIndex].result.length - 1

    // labelsDivider is simply svg width/number of ticks
    let labelsDivider = w.globals.gridWidth / tickAmount + 0.1

    // initial label position;
    let l = labelsDivider + w.config.xaxis.labels.offsetX

    let lbFormatter = w.globals.xLabelFormatter

    if (w.config.xaxis.labels.show) {
      for (let i = tickAmount; i >= 0; i--) {
        let val = w.globals.yAxisScale[realIndex].result[i]
        val = lbFormatter(val, i)

        let elTick = graphics.drawText({
          x:
            w.globals.gridWidth +
            w.globals.padHorizontal -
            (l - labelsDivider + w.config.xaxis.labels.offsetX),
          y: this.xAxisoffX + w.config.xaxis.labels.offsetY + 30,
          text: '',
          textAnchor: 'middle',
          foreColor: Array.isArray(this.xaxisForeColors)
            ? this.xaxisForeColors[realIndex]
            : this.xaxisForeColors,
          fontSize: this.xaxisFontSize,
          fontFamily: this.xaxisFontFamily,
          cssClass:
            'apexcharts-xaxis-label ' + w.config.xaxis.labels.style.cssClass
        })

        elXaxisTexts.add(elTick)

        elTick.tspan(val)

        let elTooltipTitle = document.createElementNS(w.globals.svgNS, 'title')
        elTooltipTitle.textContent = val
        elTick.node.appendChild(elTooltipTitle)

        l = l + labelsDivider
      }
    }

    if (w.config.xaxis.title.text !== undefined) {
      let elYaxisTitle = graphics.group({
        class: 'apexcharts-xaxis-title apexcharts-yaxis-title-inversed'
      })

      let elYAxisTitleText = graphics.drawText({
        x: w.globals.gridWidth / 2,
        y:
          this.xAxisoffX +
          parseInt(this.xaxisFontSize) +
          parseInt(w.config.xaxis.title.style.fontSize) +
          20,
        text: w.config.xaxis.title.text,
        textAnchor: 'middle',
        fontSize: w.config.xaxis.title.style.fontSize,
        fontFamily: w.config.xaxis.title.style.fontFamily,
        cssClass:
          'apexcharts-xaxis-title-text ' + w.config.xaxis.title.style.cssClass
      })

      elYaxisTitle.add(elYAxisTitleText)

      elXaxis.add(elYaxisTitle)
    }

    let axisBorder = w.config.yaxis[realIndex].axisBorder
    if (axisBorder.show) {
      let elVerticalLine = graphics.drawLine(
        w.globals.padHorizontal + axisBorder.offsetX,
        1 + axisBorder.offsetY,
        w.globals.padHorizontal + axisBorder.offsetX,
        w.globals.gridHeight + axisBorder.offsetY,
        axisBorder.color
      )

      elXaxis.add(elVerticalLine)
    }

    return elXaxis
  }

  drawAxisTicks(
    x,
    tickAmount,
    axisBorder,
    axisTicks,
    realIndex,
    labelsDivider,
    elYaxis
  ) {
    let w = this.w
    let graphics = new Graphics(this.ctx)

    // initial label position = 0;
    let t = w.globals.translateY

    if (axisTicks.show) {
      if (w.config.yaxis[realIndex].opposite === true) x = x + axisTicks.width

      for (let i = tickAmount; i >= 0; i--) {
        let tY =
          t + tickAmount / 10 + w.config.yaxis[realIndex].labels.offsetY - 1
        if (this.isBarHorizontal) {
          tY = labelsDivider * i
        }
        let elTick = graphics.drawLine(
          x + axisBorder.offsetX - axisTicks.width + axisTicks.offsetX,
          tY + axisTicks.offsetY,
          x + axisBorder.offsetX + axisTicks.offsetX,
          tY + axisTicks.offsetY,
          axisBorder.color
        )
        elYaxis.add(elTick)
        t = t + labelsDivider
      }
    }
  }

  yAxisTitleRotate(realIndex, yAxisOpposite) {
    let w = this.w

    let graphics = new Graphics(this.ctx)

    let yAxisLabelsCoord = {
      width: 0,
      height: 0
    }
    let yAxisTitleCoord = {
      width: 0,
      height: 0
    }

    let elYAxisLabelsWrap = w.globals.dom.baseEl.querySelector(
      ` .apexcharts-yaxis[rel='${realIndex}'] .apexcharts-yaxis-texts-g`
    )

    if (elYAxisLabelsWrap !== null) {
      yAxisLabelsCoord = elYAxisLabelsWrap.getBoundingClientRect()
    }

    let yAxisTitle = w.globals.dom.baseEl.querySelector(
      `.apexcharts-yaxis[rel='${realIndex}'] .apexcharts-yaxis-title text`
    )

    if (yAxisTitle !== null) {
      yAxisTitleCoord = yAxisTitle.getBoundingClientRect()
    }

    if (yAxisTitle !== null) {
      let x = this.xPaddingForYAxisTitle(
        realIndex,
        yAxisLabelsCoord,
        yAxisTitleCoord,
        yAxisOpposite
      )

      yAxisTitle.setAttribute('x', x.xPos - (yAxisOpposite ? 10 : 0))
    }

    if (yAxisTitle !== null) {
      let titleRotatingCenter = graphics.rotateAroundCenter(yAxisTitle)
      if (!yAxisOpposite) {
        yAxisTitle.setAttribute(
          'transform',
          `rotate(-${w.config.yaxis[realIndex].title.rotate} ${
            titleRotatingCenter.x
          } ${titleRotatingCenter.y})`
        )
      } else {
        yAxisTitle.setAttribute(
          'transform',
          `rotate(${w.config.yaxis[realIndex].title.rotate} ${
            titleRotatingCenter.x
          } ${titleRotatingCenter.y})`
        )
      }
    }
  }

  xPaddingForYAxisTitle(
    realIndex,
    yAxisLabelsCoord,
    yAxisTitleCoord,
    yAxisOpposite
  ) {
    let w = this.w
    let oppositeAxisCount = 0

    let x = 0
    let padd = 10

    if (w.config.yaxis[realIndex].title.text === undefined || realIndex < 0) {
      return {
        xPos: x,
        padd: 0
      }
    }

    if (yAxisOpposite) {
      x =
        yAxisLabelsCoord.width +
        w.config.yaxis[realIndex].title.offsetX +
        yAxisTitleCoord.width / 2 +
        padd / 2

      oppositeAxisCount += 1

      if (oppositeAxisCount === 0) {
        x = x - padd / 2
      }
    } else {
      x =
        yAxisLabelsCoord.width * -1 +
        w.config.yaxis[realIndex].title.offsetX +
        padd / 2 +
        yAxisTitleCoord.width / 2

      if (this.isBarHorizontal) {
        padd = 25
        x =
          yAxisLabelsCoord.width * -1 -
          w.config.yaxis[realIndex].title.offsetX -
          padd
      }
    }

    return { xPos: x, padd }
  }

  // sets the x position of the y-axis by counting the labels width, title width and any offset
  setYAxisXPosition(yaxisLabelCoords, yTitleCoords) {
    let w = this.w

    let xLeft = 0
    let xRight = 0
    let leftOffsetX = 21
    let rightOffsetX = 1

    if (w.config.yaxis.length > 1) {
      this.multipleYs = true
    }

    w.config.yaxis.map((yaxe, index) => {
      let shouldNotDrawAxis =
        w.globals.ignoreYAxisIndexes.indexOf(index) > -1 ||
        !yaxe.show ||
        yaxe.floating ||
        yaxisLabelCoords[index].width === 0

      // let yAxisWidth = yaxisLabelCoords[index].width + yTitleCoords[index].width
      // if (index > 0 && !w.config.yaxis[index - 1].opposite) {
      //   prevLeftYAxisWidth =
      //     yaxisLabelCoords[index - 1].width + yTitleCoords[index - 1].width
      // }

      // if (shouldNotDrawAxis) {
      //   yAxisWidth = 0
      //   prevLeftYAxisWidth = 0
      // }

      // let multipleYPadd =
      //   this.multipleYs && yTitleCoords[index].width > 0
      //     ? yTitleCoords[index].width * 1.02
      //     : 15

      // let paddingForYAxisTitle = this.xPaddingForYAxisTitle(
      //   index,
      //   {
      //     width: yaxisLabelCoords[index].width
      //   },
      //   {
      //     width: yTitleCoords[index].width
      //   },
      //   yaxe.opposite
      // )

      // if (index > 0 && !w.config.yaxis[index - 1].opposite) {
      //   paddingForPrevYAxisTitle = this.xPaddingForYAxisTitle(
      //     index - 1,
      //     {
      //       width: yaxisLabelCoords[index - 1].width
      //     },
      //     {
      //       width: yTitleCoords[index - 1].width
      //     },
      //     w.config.yaxis[index - 1].opposite
      //   )
      // }

      // yAxisWidth = yAxisWidth + Math.abs(paddingForYAxisTitle.padd)
      // prevLeftYAxisWidth =
      //   prevLeftYAxisWidth + Math.abs(paddingForPrevYAxisTitle.padd)

      let axisWidth = yaxisLabelCoords[index].width + yTitleCoords[index].width

      if (!yaxe.opposite) {
        // left side y axis
        // let offset = yAxisWidth + 5
        // if (shouldNotDrawAxis) {
        //   offset = 0
        // }

        // if (index > 0 && !w.config.yaxis[index - 1].opposite) {
        //   leftOffsetX =
        //     yaxisLabelCoords[index - 1].width + yTitleCoords[index - 1].width
        // }

        xLeft = w.globals.translateX - leftOffsetX

        if (!shouldNotDrawAxis) {
          leftOffsetX = leftOffsetX + axisWidth + 20
        }
        w.globals.translateYAxisX[index] = xLeft + yaxe.labels.offsetX
      } else {
        xRight = w.globals.gridWidth + w.globals.translateX + rightOffsetX

        if (!shouldNotDrawAxis) {
          rightOffsetX = rightOffsetX + axisWidth + 20
        }

        w.globals.translateYAxisX[index] = xRight - yaxe.labels.offsetX + 20
      }
    })
  }
}
