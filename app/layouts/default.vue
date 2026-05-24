<script setup lang="ts">
const nuxtApp = useNuxtApp()

let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null

nuxtApp.hook('page:finish', () => {
  if (scrollTimeoutId) {
    clearTimeout(scrollTimeoutId)
  }

  scrollTimeoutId = setTimeout(() => {
    const scrollContainer = document.getElementById('main-scroll-container')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
    scrollTimeoutId = null
  }, 400)
})
</script>

<template>
  <div class="flex h-dvh flex-col overflow-hidden">
    <div class="pointer-events-none fixed inset-0 z-0">
      <TheExperience />
    </div>

    <TheCursor />

    <TheHeader />

    <main
      id="main-scroll-container"
      class="relative z-10 no-scrollbar flex-1 overflow-x-hidden overflow-y-auto"
    >
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
