<template>
  <TheContentContainer>
    <h1 class="mb-6 text-4xl font-bold">Works</h1>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div
        v-for="i in 6"
        :key="i"
        class="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-white/20"
      >
        <span class="text-xl font-medium">Project {{ i }}</span>
      </div>
    </div>
  </TheContentContainer>
</template>
