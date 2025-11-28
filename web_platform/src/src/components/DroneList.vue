<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDeviceStore } from '../stores/deviceStore'
import { Promotion, VideoPlay, Lightning, Connection } from '@element-plus/icons-vue'

const store = useDeviceStore()
let timer: any = null

onMounted(() => {
  if (store.droneList.length === 0) {
    store.initDrones()
  }
  
  timer = setInterval(() => {
    store.updateMockData()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Fly': return '#409EFF'
    case 'Clean': return '#E6A23C'
    case 'Charge': return '#F56C6C'
    default: return '#67C23A'
  }
}
</script>

<template>
  <div class="drone-list-container">
    <div v-for="drone in store.droneList" :key="drone.id" class="drone-card">
      
      <div class="card-row">
        <span class="drone-name">
          <el-icon><Promotion /></el-icon> {{ drone.name }}
        </span>
        <el-tag :color="getStatusColor(drone.status)" effect="dark" size="small" class="status-tag">
          {{ drone.status }}
        </el-tag>
      </div>

      <div class="card-row progress-row">
        <el-icon class="icon-battery"><Lightning /></el-icon>
        <el-progress 
          :percentage="drone.battery" 
          :status="drone.battery < 20 ? 'exception' : (drone.battery < 50 ? 'warning' : 'success')"
          :stroke-width="10"
          :show-text="true"
          class="battery-bar"
        />
      </div>

      <div class="card-row detail-row">
        <span class="detail-text">任务: {{ drone.status === 'Clean' ? '清洁区A' : '巡航中' }}</span>
        <span class="detail-text signal">
          <el-icon><Connection /></el-icon> {{ drone.signal }}ms
        </span>
      </div>

    </div>
  </div>
</template>

<style scoped>
.drone-list-container {
  overflow-y: auto;
  height: 100%;
  padding-right: 5px;
}

.drone-list-container::-webkit-scrollbar {
  width: 4px;
}
.drone-list-container::-webkit-scrollbar-thumb {
  background: #1f2f4a;
  border-radius: 2px;
}

.drone-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.drone-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: #409EFF;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.drone-name {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-tag {
  border: none;
}

.progress-row {
  margin-bottom: 5px;
  gap: 8px;
}
.icon-battery {
  color: #E6A23C;
}
.battery-bar {
  flex: 1;
}

:deep(.el-progress__text) {
  color: #fff;
  font-size: 12px !important;
  min-width: 35px;
}

.detail-row {
  margin-bottom: 0;
  font-size: 12px;
  color: #8daac4;
}

.signal {
  display: flex;
  align-items: center;
  gap: 3px;
}
</style>