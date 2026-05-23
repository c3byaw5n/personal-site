<script setup lang="ts">
import gsap from 'gsap'

const isVisible = ref(false)
const isHovering = ref(false)
const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)

let gsapCtx: gsap.Context
let xSetDot: (value: number) => void
let ySetDot: (value: number) => void
let xSetRing: (value: number) => void
let ySetRing: (value: number) => void

const onMouseMove = (e: MouseEvent) => {
  if (!isVisible.value) isVisible.value = true

  xSetDot(e.clientX - 4)
  ySetDot(e.clientY - 4)

  xSetRing(e.clientX - 16)
  ySetRing(e.clientY - 16)
}

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const isClickable = !!target.closest('a, button, input, [role="button"]')

  if (isClickable && !isHovering.value) {
    isHovering.value = true
    gsap.to(cursorRing.value, {
      scale: 1.5,
      backgroundColor: 'rgba(232, 121, 249, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(cursorDot.value, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.out' })
  } else if (!isClickable && isHovering.value) {
    isHovering.value = false
    gsap.to(cursorRing.value, {
      scale: 1,
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(cursorDot.value, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
  }
}

const onMouseLeave = () => (isVisible.value = false)
const onMouseEnter = () => (isVisible.value = true)

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches) {
    gsapCtx = gsap.context(() => {
      xSetDot = gsap.quickTo(cursorDot.value, 'x', { duration: 0.01, ease: 'none' })
      ySetDot = gsap.quickTo(cursorDot.value, 'y', { duration: 0.01, ease: 'none' })

      xSetRing = gsap.quickTo(cursorRing.value, 'x', { duration: 0.15, ease: 'power2.out' })
      ySetRing = gsap.quickTo(cursorRing.value, 'y', { duration: 0.15, ease: 'power2.out' })
    })

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    document.documentElement.classList.add('hide-default-cursor')
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.documentElement.classList.remove('hide-default-cursor')

  if (gsapCtx) {
    gsapCtx.revert()
  }
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-9999 hidden sm:block">
    <div
      ref="cursorDot"
      class="absolute top-0 left-0 h-2 w-2 rounded-full bg-fuchsia-500 opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible }"
    ></div>
    <div
      ref="cursorRing"
      class="absolute top-0 left-0 h-8 w-8 rounded-full border border-fuchsia-400/60 opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': isVisible }"
    ></div>
  </div>
</template>
