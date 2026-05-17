<script setup lang="ts">
const DEFAULT_DPR: [number, number] = [1, 2]
const MOBILE_DPR: [number, number] = [1, 1.5]

const dprSettings = ref<[number, number]>(DEFAULT_DPR)

onMounted(() => {
  if (typeof window === 'undefined') return

  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)

  if (isMobile) {
    dprSettings.value = MOBILE_DPR
  }
})
</script>

<template>
  <TresCanvas clear-color="#ffffff" :dpr="dprSettings">
    <TheScene />
  </TresCanvas>
</template>
