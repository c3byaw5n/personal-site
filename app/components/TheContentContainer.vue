<script setup lang="ts">
const { isAnimating } = useCameraState()
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
    <section
      class="pointer-events-auto flex h-[80vh] w-full flex-col overflow-hidden transition-all duration-700 ease-in-out"
      :class="isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'"
    >
      <div class="no-scrollbar flex-1 overflow-y-auto p-4">
        <div class="max-w-none">
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>
