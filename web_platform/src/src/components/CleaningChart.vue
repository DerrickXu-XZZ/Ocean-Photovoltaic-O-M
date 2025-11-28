<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useDeviceStore } from '../stores/deviceStore'

const store = useDeviceStore()
const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

const updateChartData = () => {
  if (!myChart) return
  myChart.setOption({
    series: [
      {
        data: [
          { value: store.cleaningProgress, name: '已完成' },
          { value: 100 - store.cleaningProgress, name: '待清洁', itemStyle: { color: '#1f2f4a' } }
        ]
      }
    ]
  })
}

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)
    
    const option = {
      backgroundColor: 'transparent',
      title: {
        text: '覆盖率',
        left: 'center',
        top: 'center',
        textStyle: { color: '#fff', fontSize: 14 }
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: { show: false },
          itemStyle: {
            borderRadius: 5
          },
          data: [
            { 
                value: store.cleaningProgress, 
                name: '已完成',
                itemStyle: { color: '#67C23A' }
            },
            { 
                value: 100 - store.cleaningProgress, 
                name: '待清洁',
                itemStyle: { color: '#1f2f4a' }
            }
          ]
        }
      ]
    }
    myChart.setOption(option)
    
    watch(() => store.cleaningProgress, updateChartData)
    
    window.addEventListener('resize', () => myChart?.resize())
  }
})

onUnmounted(() => {
  myChart?.dispose()
})
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