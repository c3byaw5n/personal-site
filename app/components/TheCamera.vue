<script setup lang="ts">
import type { PerspectiveCamera } from 'three'
import gsap from 'gsap'

const CAMERA_POSITIONS: Record<string, { x: number; y: number; z: number }> = {
  '/': { x: 0, y: 0, z: 15 },
  '/about': { x: 5, y: 2, z: 5 },
  '/works': { x: -5, y: -2, z: 5 },
}

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const route = useRoute()

const updateCamera = (path: string, isImmediate = false): void => {
  const target = CAMERA_POSITIONS[path] || CAMERA_POSITIONS['/']

  if (!target) return
  if (!cameraRef.value) return

  if (isImmediate) {
    cameraRef.value.position.set(target.x, target.y, target.z)
    cameraRef.value.lookAt(0, 0, 0)
  } else {
    gsap.to(cameraRef.value.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        cameraRef.value?.lookAt(0, 0, 0)
      },
    })
  }
}

watch(
  () => route.path,
  (newPath) => {
    updateCamera(newPath)
  }
)

onMounted(() => {
  updateCamera(route.path, true)
})
</script>

<template>
  <TresPerspectiveCamera ref="cameraRef" :args="[45, 1, 0.1, 1000]" />
</template>
