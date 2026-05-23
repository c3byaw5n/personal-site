<template>
  <div class="flex h-dvh flex-col overflow-hidden">
    <div class="pointer-events-none fixed inset-0 z-0">
      <TheExperience />
    </div>

    <TheCursor />

    <TheHeader />

    <main class="relative z-10 no-scrollbar flex-1 overflow-x-hidden overflow-y-auto">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
