<template>
  <div class="relative min-h-screen w-full">
    <div class="pointer-events-none fixed inset-0 z-0">
      <TheExperience />
    </div>

    <TheHeader />

    <main class="relative z-10 min-h-screen w-full">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
