<script setup lang="ts">
import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'
import gsap from 'gsap'

const CAMERA_POSITIONS: Record<string, { x: number; y: number; z: number }> = {
  '/': { x: 0, y: 0, z: 18 },
  '/blog': { x: -18, y: -4, z: 10 },
  '/works': { x: 18, y: 5, z: 12 },
}

const ANIMATION_DURATION = 2.0
const OPENING_DURATION = 3.5

const CAMERA_FOV = 45
const CAMERA_ASPECT = 1
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 1000
const CAMERA_TARGET = new Vector3(0, 0, 0)

const MAX_BANK_ANGLE = 0.15
const SPIN_ROTATIONS = Math.PI

interface TimelineState {
  x: number
  y: number
  z: number
  angle: number
}

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const route = useRoute()
const { startAnimating, stopAnimating } = useCameraState()
const { isOpeningComplete, isOpeningAnimating } = useAppState()

let activeTimeline: gsap.core.Timeline | gsap.core.Tween | null = null

const getBasePath = (path?: string): string => {
  if (!path || path === '/') return '/'
  return `/${path.split('/')[1]}`
}

const updateCamera = (path: string, isImmediate = false): void => {
  const target = CAMERA_POSITIONS[path] || CAMERA_POSITIONS['/']

  if (!target || !cameraRef.value) return

  if (activeTimeline) {
    activeTimeline.kill()
  }

  if (isImmediate) {
    cameraRef.value.position.set(target.x, target.y, target.z)
    cameraRef.value.up.set(0, 1, 0)
    cameraRef.value.lookAt(CAMERA_TARGET)
    stopAnimating()
  } else {
    startAnimating()

    const currentPos = cameraRef.value.position
    const direction = target.x > currentPos.x ? -1 : 1

    const state: TimelineState = {
      x: currentPos.x,
      y: currentPos.y,
      z: currentPos.z,
      angle: 0,
    }

    const tl = gsap.timeline({
      onUpdate: () => {
        if (!cameraRef.value) return
        cameraRef.value.position.set(state.x, state.y, state.z)
        cameraRef.value.up.set(Math.sin(state.angle), Math.cos(state.angle), 0)
        cameraRef.value.lookAt(CAMERA_TARGET)
      },
      onComplete: () => {
        cameraRef.value?.up.set(0, 1, 0)
        cameraRef.value?.lookAt(CAMERA_TARGET)
        stopAnimating()
        activeTimeline = null
      },
    })

    activeTimeline = tl

    tl.to(
      state,
      {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: ANIMATION_DURATION,
        ease: 'power2.inOut',
      },
      0
    )

    tl.to(
      state,
      {
        angle: MAX_BANK_ANGLE * direction,
        duration: ANIMATION_DURATION * 0.4,
        ease: 'power1.out',
      },
      0
    )

    tl.to(
      state,
      {
        angle: 0,
        duration: ANIMATION_DURATION * 0.6,
        ease: 'power1.inOut',
      },
      ANIMATION_DURATION * 0.4
    )
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

    const state: TimelineState = {
      x: 0,
      y: 0,
      z: 40,
      angle: SPIN_ROTATIONS,
    }

    activeTimeline = gsap.to(state, {
      x: target.x,
      y: target.y,
      z: target.z,
      angle: 0,
      duration: OPENING_DURATION,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (!cameraRef.value) return
        cameraRef.value.position.set(state.x, state.y, state.z)
        cameraRef.value.up.set(Math.sin(state.angle), Math.cos(state.angle), 0)
        cameraRef.value.lookAt(CAMERA_TARGET)
      },
      onComplete: () => {
        cameraRef.value?.up.set(0, 1, 0)
        cameraRef.value?.lookAt(CAMERA_TARGET)
        stopAnimating()
        activeTimeline = null
      },
    })
  }
})

onMounted(() => {
  const basePath = getBasePath(route.path)

  if (!isOpeningComplete.value && basePath === '/') {
    if (cameraRef.value) {
      cameraRef.value.position.set(0, 0, 40)
      cameraRef.value.up.set(Math.sin(SPIN_ROTATIONS), Math.cos(SPIN_ROTATIONS), 0)
      cameraRef.value.lookAt(CAMERA_TARGET)
    }
  } else {
    updateCamera(basePath, true)
  }
})

onUnmounted(() => {
  if (activeTimeline) {
    activeTimeline.kill()
  }
})
</script>

<template>
  <TresPerspectiveCamera
    ref="cameraRef"
    :args="[CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR]"
  />
</template>
