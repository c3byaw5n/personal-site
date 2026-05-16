<script setup lang="ts">
import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'
import gsap from 'gsap'

const CAMERA_POSITIONS: Record<string, { x: number; y: number; z: number }> = {
  '/': { x: 0, y: 0, z: 18 },
  '/about': { x: 3.5, y: 2.2, z: 4 },
  '/blog': { x: -3.5, y: -2.2, z: 4 },
}

const ANIMATION_DURATION = 2

const CAMERA_FOV = 45
const CAMERA_ASPECT = 1
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 1000
const CAMERA_TARGET = new Vector3(0, 0, 0)

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const route = useRoute()
const { startAnimating, stopAnimating } = useCameraState()
const { isOpeningComplete, isOpeningAnimating } = useAppState()

let currentTween: gsap.core.Tween | null = null

const getBasePath = (path?: string) => {
  if (!path || path === '/') return '/'
  return `/${path.split('/')[1]}`
}

const updateCamera = (path: string, isImmediate = false): void => {
  const target = CAMERA_POSITIONS[path] || CAMERA_POSITIONS['/']

  if (!target || !cameraRef.value) return

  if (currentTween) {
    currentTween.kill()
  }

  if (isImmediate) {
    cameraRef.value.position.set(target.x, target.y, target.z)
    cameraRef.value.lookAt(CAMERA_TARGET)

    stopAnimating()
  } else {
    startAnimating()

    currentTween = gsap.to(cameraRef.value.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: ANIMATION_DURATION,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onUpdate: () => {
        cameraRef.value?.lookAt(CAMERA_TARGET)
      },
      onComplete: () => {
        stopAnimating()
        currentTween = null
      },
    })
  }
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    const newBasePath = getBasePath(newPath)
    const oldBasePath = getBasePath(oldPath)
    const isSameSection = newBasePath === oldBasePath

    updateCamera(newBasePath, isSameSection)
  }
)

watch(isOpeningAnimating, (isAnimating) => {
  if (isAnimating && cameraRef.value) {
    const target = CAMERA_POSITIONS['/'] || { x: 0, y: 0, z: 18 }

    startAnimating()
    currentTween = gsap.to(cameraRef.value.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        cameraRef.value?.lookAt(CAMERA_TARGET)
      },
      onComplete: () => {
        stopAnimating()
        currentTween = null
      },
    })
  }
})

onMounted(() => {
  const basePath = getBasePath(route.path)

  if (!isOpeningComplete.value && basePath === '/') {
    if (cameraRef.value) {
      cameraRef.value.position.set(0, 0, 40)
      cameraRef.value.lookAt(CAMERA_TARGET)
    }
  } else {
    updateCamera(basePath, true)
  }
})

onUnmounted(() => {
  if (currentTween) {
    currentTween.kill()
  }
})
</script>

<template>
  <TresPerspectiveCamera
    ref="cameraRef"
    :args="[CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR]"
  />
</template>
