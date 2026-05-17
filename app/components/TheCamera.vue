<script setup lang="ts">
import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'
import gsap from 'gsap'

const CAMERA_POSITIONS: Record<string, { x: number; y: number; z: number }> = {
  '/': { x: 0, y: 0, z: 18 },
  '/blog': { x: -22, y: 0, z: 16 },
  '/works': { x: 26, y: 0, z: 14 },
}

const ANIMATION_DURATION = 2.0
const OPENING_DURATION = 3.5

const CAMERA_ARGS: [number, number, number, number] = [45, 1, 0.1, 1000]

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

const syncCamera = (state: TimelineState) => {
  if (!cameraRef.value) return
  cameraRef.value.position.set(state.x, state.y, state.z)
  cameraRef.value.up.set(Math.sin(state.angle), Math.cos(state.angle), 0)
  cameraRef.value.lookAt(CAMERA_TARGET)
}

const updateCamera = (path: string, isImmediate = false): void => {
  const target = CAMERA_POSITIONS[path] || CAMERA_POSITIONS['/']

  if (!target || !cameraRef.value) return

  if (activeTimeline) {
    activeTimeline.kill()
  }

  if (isImmediate) {
    syncCamera({ ...target, angle: 0 })
    stopAnimating()
    return
  }

  startAnimating()

  const currentPos = cameraRef.value.position
  const direction = target.x > currentPos.x ? -1 : 1

  const state: TimelineState = {
    x: currentPos.x,
    y: currentPos.y,
    z: currentPos.z,
    angle: 0,
  }

  const splitTime = ANIMATION_DURATION * 0.4

  activeTimeline = gsap
    .timeline({
      onUpdate: () => syncCamera(state),
      onComplete: () => {
        syncCamera({ ...target, angle: 0 })
        stopAnimating()
        activeTimeline = null
      },
    })
    .to(
      state,
      { x: target.x, y: target.y, z: target.z, duration: ANIMATION_DURATION, ease: 'power2.inOut' },
      0
    )
    .to(state, { angle: MAX_BANK_ANGLE * direction, duration: splitTime, ease: 'power1.out' }, 0)
    .to(
      state,
      { angle: 0, duration: ANIMATION_DURATION - splitTime, ease: 'power1.inOut' },
      splitTime
    )
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    const newBasePath = getBasePath(newPath)
    const oldBasePath = getBasePath(oldPath)
    updateCamera(newBasePath, newBasePath === oldBasePath)
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
      onUpdate: () => syncCamera(state),
      onComplete: () => {
        syncCamera({ ...target, angle: 0 })
        stopAnimating()
        activeTimeline = null
      },
    })
  }
})

onMounted(() => {
  const basePath = getBasePath(route.path)

  if (!isOpeningComplete.value && basePath === '/') {
    syncCamera({ x: 0, y: 0, z: 40, angle: SPIN_ROTATIONS })
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
  <TresPerspectiveCamera ref="cameraRef" :args="CAMERA_ARGS" />
</template>
