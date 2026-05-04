<template>
  <div class="relative min-h-screen w-full">
    <div class="pointer-events-none fixed inset-0 z-0">
      <TheExperience />
    </div>

    <nav class="fixed left-0 top-0 z-50 flex w-full justify-center gap-8 p-8">
      <NuxtLink to="/" class="transition-colors hover:text-pink-500">HOME</NuxtLink>
      <NuxtLink to="/about" class="transition-colors hover:text-pink-500">ABOUT</NuxtLink>
      <NuxtLink to="/works" class="transition-colors hover:text-pink-500">WORKS</NuxtLink>
    </nav>

    <main class="relative z-10 min-h-screen w-full">
      <slot />
    </main>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
