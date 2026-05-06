<template>
  <div class="relative h-screen w-full overflow-hidden">
    <div class="pointer-events-none fixed inset-0 z-0">
      <TheExperience />
    </div>

    <TheHeader />

    <main class="relative z-10">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
