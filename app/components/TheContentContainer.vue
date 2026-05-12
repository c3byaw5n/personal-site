<script setup lang="ts">
const { isAnimating } = useCameraState()
</script>

<template>
  <div class="z-10 flex justify-center px-5 py-8">
    <section
      class="w-full max-w-3xl transition-all duration-700 ease-in-out"
      :class="isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'"
    >
      <slot />
    </section>
  </div>
</template>
