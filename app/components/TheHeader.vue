<script setup lang="ts">
const navItems = [
  { name: 'ABOUT', to: '/about', icon: 'lucide:user' },
  { name: 'BLOG', to: '/blog', icon: 'lucide:pen-tool' },
  { name: 'WORKS', to: '/works', icon: 'lucide:layout-grid' },
  { name: 'GITHUB', to: 'https://github.com/c3byaw5n', icon: 'lucide:github', external: true },
]
</script>

<template>
  <header class="fixed top-0 left-0 z-50 flex w-full items-center justify-between p-6 sm:p-10">

    <NuxtLink
      to="/"
      class="group flex items-center gap-2"
    >
      <span class="text-xl sm:text-2xl font-bold text-fuchsia-950 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
        春
      </span>
      <span class="hidden text-xs tracking-[0.2em] text-fuchsia-900/50 sm:block">PERSONAL SITE</span>
    </NuxtLink>

    <nav class="flex items-center gap-6 sm:gap-8">
      <template v-for="item in navItems" :key="item.to">
        <NuxtLink
          :to="item.to"
          :target="item.external ? '_blank' : undefined"
          class="group relative flex flex-col items-center text-fuchsia-950 transition-colors hover:text-pink-600 [&.router-link-active]:text-pink-600!"
        >
          <Icon
            :name="item.icon"
            class="text-xl sm:text-2xl drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-[.router-link-active]:-translate-y-1"
          />

          <span class="absolute -bottom-6 scale-75 text-[10px] font-bold opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-[.router-link-active]:scale-100 group-[.router-link-active]:opacity-100">
            {{ item.name }}
          </span>
        </NuxtLink>
      </template>
    </nav>

  </header>
</template>
