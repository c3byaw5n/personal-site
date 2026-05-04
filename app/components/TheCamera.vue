<script setup lang="ts">
import type { PerspectiveCamera } from 'three'
import gsap from 'gsap'

const CAMERA_POSITIONS: Record<string, { x: number; y: number; z: number }> = {
  '/': { x: 0, y: 0, z: 15 },
  '/about': { x: 5, y: 2, z: 4 },
  '/works': { x: -5, y: -2, z: 4 },
}

const ANIMATION_DURATION = 2

const CAMERA_FOV = 45
const CAMERA_ASPECT = 1
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 1000

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const route = useRoute()
const { isAnimating } = useCameraState()

const updateCamera = (path: string, isImmediate = false): void => {
  const target = CAMERA_POSITIONS[path] || CAMERA_POSITIONS['/']

  if (!target || !cameraRef.value) return

  if (isImmediate) {
    cameraRef.value.position.set(target.x, target.y, target.z)
    cameraRef.value.lookAt(0, 0, 0)
    isAnimating.value = false
  } else {
    isAnimating.value = true

    gsap.to(cameraRef.value.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: ANIMATION_DURATION,
      ease: 'power2.inOut',
      onUpdate: () => {
        cameraRef.value?.lookAt(0, 0, 0)
      },
      onComplete: () => {
        isAnimating.value = false
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
  <TresPerspectiveCamera
    ref="cameraRef"
    :args="[CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR]"
  />
</template>
