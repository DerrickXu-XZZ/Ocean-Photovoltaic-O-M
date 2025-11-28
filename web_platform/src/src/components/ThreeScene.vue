<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sceneContainer = ref<HTMLElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let cube: THREE.Mesh
let controls: OrbitControls
let animationId: number

const initThreeJS = () => {
  if (!sceneContainer.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  
  scene.fog = new THREE.FogExp2(0x000000, 0.05)

  const width = sceneContainer.value.clientWidth
  const height = sceneContainer.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(3, 3, 5)
  
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  sceneContainer.value.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00d2ff, 
    wireframe: true, 
    transparent: true,
    opacity: 0.8
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const innerGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
  const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.2 })
  const innerCube = new THREE.Mesh(innerGeometry, innerMaterial)
  cube.add(innerCube)
  
  const gridHelper = new THREE.GridHelper(20, 20, 0x1f2f4a, 0x1f2f4a)
  scene.add(gridHelper)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true 
  
  animate()
  
  window.addEventListener('resize', onWindowResize)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  if (cube) {
    cube.rotation.x += 0.005
    cube.rotation.y += 0.01
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