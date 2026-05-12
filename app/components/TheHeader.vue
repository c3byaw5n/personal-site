<script setup lang="ts">
interface NavItem {
  name: string
  to: string
  icon: string
  external?: boolean
}

const navItems: NavItem[] = [
  { name: 'ABOUT', to: '/about', icon: 'lucide:user' },
  { name: 'BLOG', to: '/blog', icon: 'lucide:pen-tool' },
  { name: 'GITHUB', to: 'https://github.com/c3byaw5n', icon: 'lucide:github', external: true },
  { name: 'X', to: 'https://x.com/c3byaw5n', icon: 'ri:twitter-x-line', external: true },
]

const route = useRoute()

const getBasePath = (path?: string) => {
  if (!path || path === '/') return '/'
  return `/${path.split('/')[1]}`
}

const isActive = (path: string): boolean => {
  if (path.startsWith('http')) return false
  const basePath = getBasePath(route.path)

  return basePath === path
}
</script>

<template>
  <header class="z-50 flex items-center justify-between p-6 sm:p-10">
    <NuxtLink to="/" class="group flex items-center gap-2">
      <span
        class="text-xl font-bold drop-shadow-sm transition-transform duration-300 group-hover:scale-110 sm:text-2xl"
      >
        春
      </span>
      <span class="hidden text-xs tracking-[0.2em] text-fuchsia-900/50 sm:block">
        PERSONAL SITE
      </span>
    </NuxtLink>

    <nav class="flex items-center gap-6 sm:gap-8">
      <template v-for="item in navItems" :key="item.to">
        <NuxtLink
          :to="item.to"
          :target="item.external ? '_blank' : undefined"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          class="group relative flex flex-col items-center transition-colors hover:text-pink-600 aria-[current=page]:text-pink-600"
        >
          <Icon
            :name="item.icon"
            class="text-xl drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-aria-[current=page]:-translate-y-1 sm:text-2xl"
          />

          <span
            class="absolute -bottom-6 scale-75 text-[10px] font-bold opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-aria-[current=page]:scale-100 group-aria-[current=page]:opacity-100"
          >
            {{ item.name }}
          </span>
        </NuxtLink>
      </template>
    </nav>
  </header>
</template>
