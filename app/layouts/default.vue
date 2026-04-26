<template>
  <div class="relative min-h-screen w-full">
    <div class="pointer-events-none fixed inset-0 z-0">
      <TheExperience />
    </div>

    <main class="relative z-10 w-full">
      <slot />
    </main>
  </div>
</template>
