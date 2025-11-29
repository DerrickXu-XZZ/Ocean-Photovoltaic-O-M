<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Left Panel
import DeviceList from '../components/DroneList.vue'
// Right Panel
import StainChart from '../components/StainChart.vue'
import CleaningChart from '../components/CleaningChart.vue'
// Central Panel
import ThreeScene from '../components/ThreeScene.vue'

const currentTime = ref('')

function updateTime() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

let timer: number
onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="dashboard-container">
    
    <header class="header-bar">
      <div class="logo-area">
        <h1 class="title">海光巡翼 · 蜂舟智维</h1> 
        <span class="subtitle">海上光伏智能运维中控平台</span>
      </div>
      <div class="status-area">
        <el-tag type="success" effect="dark">系统在线</el-tag>
        <span class="time">{{ currentTime }}</span>
      </div>
    </header>

    <div class="main-content">
      
      <aside class="panel left-panel">
        <div class="panel-header">
          <h3>无人机群状态 (2架)</h3>
        </div>
        <div class="panel-body">
          <DeviceList />
        </div>
      </aside>

      <main class="panel center-panel">
        <div class="map-container">
          <ThreeScene />
        </div>

        <div class="bottom-control">
          <el-button type="primary" size="large">一键起飞</el-button>
          <el-button type="warning" size="large">全船返航</el-button>
          <el-button type="danger" size="large">紧急停止</el-button>
        </div>
      </main>

      <aside class="panel right-panel">
        <div class="item-block">
          <div class="panel-header"><h3>污渍影响分析 (功率/积尘)</h3></div>
          <div class="panel-body chart-wrapper">
            <StainChart />
          </div>
        </div>
        <div class="item-block">
          <div class="panel-header"><h3>实时清洁进度</h3></div>
          <div class="panel-body chart-wrapper">
            <CleaningChart />
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<style scoped>

.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header-bar {
  height: 60px;
  background: linear-gradient(90deg, #101a2e 0%, #000000 100%);
  border-bottom: 1px solid #1f2f4a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.title {
  margin: 0;
  font-size: 24px;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  margin-right: 15px;
}

.subtitle {
  color: #8daac4;
  font-size: 14px;
}

.status-area .time {
  margin-left: 15px;
  color: #8daac4;
  font-family: monospace;
}

.main-content {
  flex: 1;
  display: flex;
  padding: 10px;
  gap: 10px;
  overflow: hidden;
}

.panel {
  background: rgba(16, 26, 46, 0.8);
  border: 1px solid #1f2f4a;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid #1f2f4a;
}
.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #00d2ff;
  border-left: 3px solid #00d2ff;
  padding-left: 10px;
}

.left-panel {
  width: 280px;
  flex-shrink: 0;
}

.right-panel {
  width: 300px;
  flex-shrink: 0;
}

.item-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #1f2f4a;
}

.item-block:last-child {
  border-bottom: none;
}

.center-panel {
  flex: 1;
  position: relative;
}

.map-container {
  flex: 1;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-placeholder {
  text-align: center;
  color: #334b6b;
  border: 2px dashed #334b6b;
  padding: 40px;
  border-radius: 10px;
}

.bottom-control {
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-top: 1px solid #1f2f4a;
}

.panel-body {
  flex: 1;
  padding: 10px;
  color: #8daac4;
}

.chart-wrapper {
  flex: 1;
  min-height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>