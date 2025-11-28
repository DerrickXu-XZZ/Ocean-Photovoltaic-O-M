import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Drone {
  id: number
  name: string
  battery: number
  status: 'Ready' | 'Fly' | 'Clean' | 'Charge' // 待机, 飞行, 清洁, 充电
  signal: number
}

export const useDeviceStore = defineStore('device', () => {
  const droneList = ref<Drone[]>([])
  const powerData = ref({
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110], 
    y: [86, 80, 78, 78, 76, 76, 76, 75, 74, 74, 73, 71] 
  })
  const cleaningProgress = ref(0)

  function initDrones() {
    for (let i = 1; i <= 2; i++) {
      droneList.value.push({
        id: i,
        name: `Drone-${i.toString().padStart(2, '0')}`,
        battery: Math.floor(Math.random() * 40) + 60,
        status: i <= 3 ? 'Fly' : 'Ready',
        signal: 90
      })
    }
  }

  function updateMockData() {
    droneList.value.forEach(drone => {
      if (drone.status === 'Fly' || drone.status === 'Clean') {
        drone.battery -= 0.5
        if (drone.battery < 20) drone.status = 'Charge'
      } else if (drone.status === 'Charge') {
        drone.battery += 2
        if (drone.battery >= 100) drone.status = 'Ready'
      }
      
      drone.battery = Math.max(0, Math.min(100, parseFloat(drone.battery.toFixed(1))))
    })

    if (cleaningProgress.value < 100) {
        cleaningProgress.value += 0.2
        cleaningProgress.value = parseFloat(cleaningProgress.value.toFixed(1))
    } else {
        cleaningProgress.value = 0
    }
  }

  return { droneList, initDrones, updateMockData, powerData, cleaningProgress }
})