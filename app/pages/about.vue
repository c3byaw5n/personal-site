<template>
  <TheContentContainer>
    <h1 class="mb-6 text-4xl font-bold">About Me</h1>
    <div class="space-y-6 text-lg leading-relaxed">
      <p v-for="i in 50" :key="i">About Meのテストです。</p>
    </div>
  </TheContentContainer>
</template>
