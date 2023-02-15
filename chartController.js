const { ChartJSNodeCanvas, ChartCallback } = require("chartjs-node-canvas")
const ChartDataLabels = require('chartjs-plugin-datalabels');
const fs = require('fs')

class chartController {
  async test(req, res) {
    try {
      const chartData = req.body
      const bgColors = ["#004766", "#4795C3", "#0081d1", "#2b6cc4", "#75a2e0", "#5d76cb", "#7366bd"]
      //apply bg colors
      switch (true) {
        case chartData.chart.type === 'bar' || chartData.chart.type === 'line':
          chartData.series.forEach((item, idx) => {
            item.backgroundColor = bgColors[idx]
          })
        break
        case chartData.chart.type === 'pie' || chartData.chart.type === 'doughnut':
          chartData.series.forEach(item => {
            item.backgroundColor = bgColors
          })
        break
      }
      //chart size
      const width = 800
      const height = 400
      //config
      const configuration = {
        type: chartData.chart.type,
        data: {
          labels: chartData.xAxis.categories,
          datasets: chartData.series,
        },
        options: {
          scales: {
            x: {
              stacked: chartData.chart.stacked,
              grid: {
                display: chartData.chart.grid,
                drawBorder: chartData.chart.grid,
              },
              title: {
                display: !!chartData.xAxis.title,
                text: chartData.xAxis.title
              },
              ticks: {
                display: chartData.xAxis.labels
              },
            },
            y: {
              stacked: chartData.chart.stacked,
              grid: {
                display: chartData.chart.grid,
                drawBorder: chartData.chart.grid,
              },
              title: {
                display: !!chartData.yAxis.title,
                text: chartData.yAxis.title
              },
              ticks: {
                display: chartData.yAxis.labels
              },
              type: 'linear',
              grace: '25%'
            }
          },
          plugins: {
            datalabels: {
              anchor: chartData.chart.type === 'bar' && !chartData.chart.stacked ? 'end' : 'center',
              align: chartData.chart.type === 'bar' && !chartData.chart.stacked ? 'top' : 'center',
              formatter: Math.round,
              color: chartData.chart.type === 'bar' && !chartData.chart.stacked ? 'black' : 'white',
              font: {
                weight: 'bold'
              }
            },
            legend: {
              display: chartData.legend.show,
              position: chartData.legend.position,
              align: chartData.legend.align
            },
            title: {
              display: !!chartData.title,
              text: chartData.title
            }
          }
        },
        plugins: [{
          id: "background-colour",
          beforeDraw: (chart) => {
            const ctx = chart.ctx
            ctx.save()
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, width, height)
            ctx.restore()
          },
        }],
      }
      const chartCallback = (ChartJS) => {
        ChartJS.defaults.responsive = true
        ChartJS.defaults.maintainAspectRatio = false
        ChartJS.register(ChartDataLabels)
      }
      const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback, plugins: { modern: ['chartjs-plugin-datalabels'] } })
      const buffer = await chartJSNodeCanvas.renderToBuffer(configuration)
      // await fs.writeFile("./example.png", buffer, "base64")
      res.writeHead(200, { 'Content-Type': 'image/png' })
      res.end(buffer, 'utf8')
    } catch (e) {
      res.status(400).json()
    }
  }
}

module.exports = new chartController()