<script setup lang="ts">
import gsap from 'gsap'

const containerRef = shallowRef<HTMLElement | null>(null)
const { isOpeningAnimating, setOpeningAnimating, setOpeningComplete } = useAppState()

const handleInteraction = (): void => {
  if (isOpeningAnimating.value) return

  setOpeningAnimating(true)

  if (containerRef.value) {
    gsap.to(containerRef.value, {
      scale: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        setOpeningComplete(true)
        setOpeningAnimating(false)
      },
    })
  } else {
    // フォールバック
    setOpeningComplete(true)
    setOpeningAnimating(false)
  }
}
</script>

<template>
  <div
    ref="containerRef"
    role="button"
    tabindex="0"
    aria-label="Enter personal site"
    class="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center focus:outline-none"
    :class="isOpeningAnimating ? 'pointer-events-none' : ''"
    @click="handleInteraction"
    @keydown.enter="handleInteraction"
    @touchstart.passive="handleInteraction"
  >
    <h1 class="text-4xl tracking-widest drop-shadow-lg">Personal Site</h1>
    <p
      class="mt-8 text-xs tracking-[0.3em] text-fuchsia-700/70 md:text-sm"
      :class="{ 'animate-pulse': !isOpeningAnimating }"
    >
      CLICK, TAP OR PRESS ENTER
    </p>
  </div>
</template>
