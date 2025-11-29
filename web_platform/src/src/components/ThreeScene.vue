<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const sceneContainer = ref<HTMLElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let cube: THREE.Mesh
let controls: OrbitControls
let animationId: number
let droneModel: THREE.Group | null = null

const initThreeJS = () => {
  if (!sceneContainer.value) return

  // MARK: 基本场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#050a14')
  scene.fog = new THREE.FogExp2(0x050a14, 0.06)

  const width = sceneContainer.value.clientWidth
  const height = sceneContainer.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(3, 3, 5)
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true
  sceneContainer.value.appendChild(renderer.domElement)

  // MARK: 灯光预设
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 2)
  dirLight.position.set(10, 10, 10)
  scene.add(dirLight)
  const pointLight = new THREE.PointLight(0x00d2ff, 5, 50)
  pointLight.position.set(-5, 5, -5)
  scene.add(pointLight)
  const gridHelper = new THREE.GridHelper(20, 20, 0x1f2f4a, 0x1f2f4a)
  scene.add(gridHelper)
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  // MARK: 加载模型
  const loader = new GLTFLoader()
  loader.load(
    '/models/drone.glb',
    (gltf) => {
      droneModel = gltf.scene
      
      droneModel.scale.set(0.5, 0.5, 0.5) 
      droneModel.position.set(0, 1, 0)

      scene.add(droneModel)
      console.log('模型加载成功！')
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      console.error('模型加载失败', error)
    }
  )

  // MARK: 控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true 
  
  animate()
  
  window.addEventListener('resize', onWindowResize)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  if (droneModel) {
    droneModel.rotation.x += 0.005
    droneModel.rotation.y += 0.01
    droneModel.rotation.z += 0.003
  }
  
  controls.update()
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  if (!sceneContainer.value || !camera || !renderer) return
  
  const width = sceneContainer.value.clientWidth
  const height = sceneContainer.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

onMounted(() => {
  initThreeJS()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onWindowResize)
  renderer.dispose()
})
</script>

<template>
  <div ref="sceneContainer" class="three-container"></div>
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>