<script setup lang="ts">
import { Color, CanvasTexture } from 'three'
import type { Points } from 'three'

const PARTICLE_COUNT = 500
const PARTICLE_SPREAD = 10
const PARTICLE_SIZE = 0.1

const TEXTURE_SIZE = 64
const TEXTURE_CENTER = TEXTURE_SIZE / 2

const ROTATION_SPEED_Y = 0.05
const ROTATION_SPEED_X = 0.02

const COLOR_START = new Color('#ff80ab')
const COLOR_END = new Color('#c51162')

const pointsRef = shallowRef<Points | null>(null)
const { onBeforeRender } = useLoop()

const positions = new Float32Array(PARTICLE_COUNT * 3)
const colors = new Float32Array(PARTICLE_COUNT * 3)
const tempColor = new Color()

for (let i = 0; i < PARTICLE_COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * PARTICLE_SPREAD
  positions[i * 3 + 1] = (Math.random() - 0.5) * PARTICLE_SPREAD
  positions[i * 3 + 2] = (Math.random() - 0.5) * PARTICLE_SPREAD

  tempColor.copy(COLOR_START).lerp(COLOR_END, Math.random())
  colors[i * 3] = tempColor.r
  colors[i * 3 + 1] = tempColor.g
  colors[i * 3 + 2] = tempColor.b
}

const createStarTexture = (): CanvasTexture => {
  const canvas = document.createElement('canvas')
  canvas.width = TEXTURE_SIZE
  canvas.height = TEXTURE_SIZE
  const context = canvas.getContext('2d')

  if (context) {
    const gradient = context.createRadialGradient(
      TEXTURE_CENTER,
      TEXTURE_CENTER,
      0,
      TEXTURE_CENTER,
      TEXTURE_CENTER,
      TEXTURE_CENTER
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    context.fillStyle = gradient
    context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE)
  }
  return new CanvasTexture(canvas)
}

const starTexture = createStarTexture()

onBeforeRender(({ delta }) => {
  if (pointsRef.value) {
    pointsRef.value.rotation.y += delta * ROTATION_SPEED_Y
    pointsRef.value.rotation.x += delta * ROTATION_SPEED_X
  }
})
</script>

<template>
  <TresPoints ref="pointsRef">
    <TresBufferGeometry :position="[positions, 3]" :color="[colors, 3]" />
    <TresPointsMaterial
      :size="PARTICLE_SIZE"
      :size-attenuation="true"
      :vertex-colors="true"
      :map="starTexture"
      transparent
      :depth-write="false"
    />
  </TresPoints>
</template>
