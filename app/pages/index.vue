<script setup lang="ts">
const { isAnimating } = useCameraState()
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-10 flex items-center justify-center transition-opacity duration-1000 ease-in-out"
    :class="isAnimating ? 'opacity-0' : 'opacity-100'"
  >
    <h1 class="text-3xl tracking-widest drop-shadow-lg">Personal Site</h1>
  </div>
</template>
