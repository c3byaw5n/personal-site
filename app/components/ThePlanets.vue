<script setup lang="ts">
import { CanvasTexture } from 'three'
import type { Sprite } from 'three'

const ABOUT_PLANET_POS: [number, number, number] = [3, 2, 2]
const BLOG_PLANET_POS: [number, number, number] = [-3, -2, 2]

const STAR_SIZE = 0.7
const FLOAT_SPEED = 1.0
const FLOAT_AMPLITUDE = 0.15

const ABOUT_STAR_COLOR = '#ff80ab'
const BLOG_STAR_COLOR = '#ff80ab'

const TEXTURE_SIZE = 128
const TEXTURE_CENTER = TEXTURE_SIZE / 2

const aboutStarRef = shallowRef<Sprite | null>(null)
const blogStarRef = shallowRef<Sprite | null>(null)
const { onBeforeRender } = useLoop()

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
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    context.fillStyle = gradient
    context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE)
  }
  return new CanvasTexture(canvas)
}

const starTexture = createStarTexture()

onBeforeRender(({ elapsed }) => {
  if (aboutStarRef.value) {
    aboutStarRef.value.position.y =
      ABOUT_PLANET_POS[1] + Math.sin(elapsed * FLOAT_SPEED) * FLOAT_AMPLITUDE
  }
  if (blogStarRef.value) {
    blogStarRef.value.position.y =
      BLOG_PLANET_POS[1] + Math.sin((elapsed + 2) * FLOAT_SPEED) * FLOAT_AMPLITUDE
  }
})
</script>

<template>
  <TresSprite ref="aboutStarRef" :position="ABOUT_PLANET_POS" :scale="[STAR_SIZE, STAR_SIZE, 1]">
    <TresSpriteMaterial
      :color="ABOUT_STAR_COLOR"
      :map="starTexture"
      transparent
      :depth-write="false"
    />
  </TresSprite>

  <TresSprite ref="blogStarRef" :position="BLOG_PLANET_POS" :scale="[STAR_SIZE, STAR_SIZE, 1]">
    <TresSpriteMaterial
      :color="BLOG_STAR_COLOR"
      :map="starTexture"
      transparent
      :depth-write="false"
    />
  </TresSprite>
</template>
