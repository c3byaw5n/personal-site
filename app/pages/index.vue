<script setup lang="ts">
useSeoMeta({
  ogType: 'profile',
})

interface TechItem {
  name: string
  icon?: string
  isSpecial?: boolean
}

const techStack: TechItem[] = [
  { name: 'Vue / Nuxt', icon: 'logos:nuxt-icon' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'Docker', icon: 'logos:docker-icon' },
]

const learningStack: TechItem[] = [
  { name: 'Python', icon: 'logos:python' },
  { name: '日本語', isSpecial: true },
]

const { isOpeningComplete } = useAppState()
</script>

<template>
  <div class="relative min-h-full">
    <TheOpening v-if="!isOpeningComplete" />

    <Transition
      enter-active-class="transition-all duration-1000 delay-300 ease-out"
      enter-from-class="opacity-0 translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
    >
      <TheContentContainer>
        <div class="flex flex-col items-center">
          <div
            class="mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-pink-900/30 shadow-xl"
          >
            <NuxtImg
              src="/avatar.png"
              alt="Profile Icon"
              class="pointer-events-none h-full w-full object-cover select-none"
              format="webp"
              @contextmenu.prevent
            />
          </div>

          <h1 class="mb-4 text-3xl font-bold tracking-widest">荒井 春陽</h1>

          <div class="mb-6 flex items-center gap-2 text-sm tracking-wider text-fuchsia-500">
            <Icon name="lucide:building-2" />
            <a
              href="https://www.terasol.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-4 transition-colors hover:text-fuchsia-700"
            >
              株式会社テラソリューション
            </a>
          </div>

          <div class="prose mb-8 max-w-2xl text-lg prose-p:text-fuchsia-950/80">
            <p>バックエンドからフロントエンドまで幅広く担当しています。</p>
            <p>実務では現在、C#（ASP.NET Core）とSQL Serverを使用中。</p>
          </div>

          <h2 class="mb-6 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
            Tech Stack
          </h2>

          <div class="mb-6 flex flex-wrap justify-center gap-6">
            <div
              v-for="tech in techStack"
              :key="tech.name"
              class="group flex flex-col items-center gap-2"
            >
              <Icon
                v-if="tech.icon"
                :name="tech.icon"
                class="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] grayscale-0 transition-all duration-500 ease-out group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
              />
              <span
                class="text-xs font-bold tracking-wider opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>

          <h2 class="mb-6 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
            Currently Learning
          </h2>

          <div class="flex flex-wrap justify-center gap-6">
            <div
              v-for="tech in learningStack"
              :key="tech.name"
              class="group flex flex-col items-center gap-2"
            >
              <Icon
                v-if="!tech.isSpecial && tech.icon"
                :name="tech.icon"
                class="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] grayscale-0 transition-all duration-500 ease-out group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
              />

              <div v-else class="flex h-7.5 items-center justify-center">
                <span
                  class="-mt-px animate-rainbow-mobile text-3xl font-bold transition-all duration-500 ease-in-out group-hover:scale-110 md:animate-none md:grayscale md:group-hover:animate-rainbow-desktop"
                >
                  あ
                </span>
              </div>

              <span
                class="text-xs font-bold tracking-wider opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </TheContentContainer>
    </Transition>
  </div>
</template>
