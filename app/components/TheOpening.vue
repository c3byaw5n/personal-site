<script setup lang="ts">
const { isOpeningAnimating, setOpeningAnimating, setOpeningComplete } = useAppState()

const handleInteraction = (): void => {
  if (isOpeningAnimating.value) return

  setOpeningAnimating(true)

  setTimeout(() => {
    setOpeningComplete(true)
    setOpeningAnimating(false)
  }, 500)
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    aria-label="Enter personal site"
    class="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center transition-opacity duration-1000 focus:outline-none"
    :class="isOpeningAnimating ? 'pointer-events-none opacity-0' : 'opacity-100'"
    @click="handleInteraction"
    @keydown.enter="handleInteraction"
    @touchstart.passive="handleInteraction"
  >
    <h1 class="text-3xl tracking-widest drop-shadow-lg md:text-5xl">Personal Site</h1>
    <p class="mt-8 animate-pulse text-xs tracking-[0.3em] text-fuchsia-100/70 md:text-sm">
      CLICK, TAP OR PRESS ENTER
    </p>
  </div>
</template>
