<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useDeviceStore } from '../stores/deviceStore'

const store = useDeviceStore()
const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)
    
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '15%',
        left: '12%',
        right: '5%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        name: '积尘(g)',
        nameTextStyle: { color: '#8daac4' },
        data: store.powerData.x,
        axisLine: { lineStyle: { color: '#1f2f4a' } },
        axisLabel: { color: '#8daac4' }
      },
      yAxis: {
        type: 'value',
        name: '功率(W)',
        nameTextStyle: { color: '#8daac4' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)', type: 'dashed' } },
        axisLabel: { color: '#8daac4' },
        min: 60
      },
      series: [
        {
          name: '输出功率',
          type: 'line',
          data: store.powerData.y,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#00d2ff' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 210, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 210, 255, 0)' }
            ])
          }
        }
      ]
    }
    myChart.setOption(option)
    
    window.addEventListener('resize', resizeChart)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  myChart?.dispose()
})

const resizeChart = () => myChart?.resize()
</script>

<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>