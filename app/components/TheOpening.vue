<script setup lang="ts">
import gsap from 'gsap'

const ANIMATION_SCALE = 50
const ANIMATION_DURATION = 1.5
const TOTAL_WAIT_TIME = 2.5

const containerRef = shallowRef<HTMLElement | null>(null)
const { isOpeningAnimating, setOpeningAnimating, setOpeningComplete } = useAppState()

const finalizeOpening = (): void => {
  setOpeningComplete(true)
  setOpeningAnimating(false)
}

const handleInteraction = (): void => {
  if (isOpeningAnimating.value) return

  setOpeningAnimating(true)

  if (!containerRef.value) return finalizeOpening()

  const mobile = isMobile()

  gsap.to(containerRef.value, {
    scale: ANIMATION_SCALE,
    duration: ANIMATION_DURATION,
    ease: 'power2.in',
  })

  gsap.to(containerRef.value, {
    opacity: 0,
    filter: mobile ? 'none' : 'blur(4px)',
    duration: ANIMATION_DURATION * 0.8,
    ease: 'power1.out',
  })

  gsap.delayedCall(TOTAL_WAIT_TIME, finalizeOpening)
}

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (isOpeningAnimating.value) return

  if (event.key === 'Enter') {
    event.preventDefault()
    handleInteraction()
  } else if (event.key === 'Tab') {
    event.preventDefault()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)

  containerRef.value?.focus()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<template>
  <div
    ref="containerRef"
    role="button"
    :tabindex="isOpeningAnimating ? -1 : 0"
    aria-label="Enter personal site"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center focus:outline-none"
    :class="isOpeningAnimating ? 'cursor-default touch-none' : 'cursor-pointer'"
    @click="handleInteraction"
    @touchstart.passive="handleInteraction"
  >
    <p class="mb-6 text-3xl tracking-widest">Personal Site</p>
    <p
      class="text-xs tracking-[0.3em] text-fuchsia-700/70 md:text-sm"
      :class="{ 'animate-pulse': !isOpeningAnimating }"
    >
      CLICK, TAP OR PRESS ENTER
    </p>
  </div>
</template>
