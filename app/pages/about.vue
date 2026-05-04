<script setup lang="ts">
const techStack = [
  { name: 'Vue / Nuxt', icon: 'logos:nuxt-icon' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'Docker', icon: 'logos:docker-icon' },
]

const learningStack = [
  { name: 'Python', icon: 'logos:python' },
  { name: '日本語', isSpecial: true },
]
</script>

<template>
  <TheContentContainer>
    <div class="flex flex-col items-center text-center">
      <div
        class="relative mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-pink-900/30 shadow-xl"
      >
        <img
          src="/avatar.png"
          alt="Profile Icon"
          class="pointer-events-none h-full w-full object-cover select-none"
          @contextmenu.prevent
        />
      </div>

      <h1 class="mb-6 text-3xl font-bold tracking-tight">荒井 春陽</h1>

      <div class="mb-4 flex items-center gap-2 text-sm tracking-wider text-fuchsia-500">
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

      <div class="prose mb-8 max-w-2xl text-lg leading-relaxed">
        <p>バックエンドからフロントエンドまで幅広く担当しています。</p>
        <p>実務では現在、C#（ASP.NET Core）とSQL Serverを使用中。</p>
      </div>

      <div class="mb-6 w-full max-w-xl">
        <h2 class="mb-6 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
          Tech Stack
        </h2>
        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="group flex flex-col items-center gap-2"
          >
            <Icon
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
      </div>

      <div class="w-full max-w-xl">
        <h2 class="mb-6 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
          Currently Learning
        </h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div
            v-for="tech in learningStack"
            :key="tech.name"
            class="group flex flex-col items-center gap-3"
          >
            <Icon
              v-if="!tech.isSpecial"
              :name="tech.icon!"
              class="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] grayscale-0 transition-all duration-500 ease-out group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
            />

            <div v-else class="relative flex h-7.5 items-center justify-center">
              <span
                class="rainbow-text text-3xl font-bold grayscale-0 transition-transform duration-500 group-hover:scale-125 md:grayscale"
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
    </div>
  </TheContentContainer>
</template>

<style scoped>
@keyframes rainbow-glow {
  0% {
    filter: drop-shadow(0 0 8px #ff0000);
    color: #ff0000;
  }
  14.3% {
    filter: drop-shadow(0 0 8px #ff8800);
    color: #ff8800;
  }
  28.6% {
    filter: drop-shadow(0 0 8px #ffff00);
    color: #ffff00;
  }
  42.9% {
    filter: drop-shadow(0 0 8px #00ff00);
    color: #00ff00;
  }
  57.1% {
    filter: drop-shadow(0 0 8px #0088ff);
    color: #0088ff;
  }
  71.4% {
    filter: drop-shadow(0 0 8px #0000ff);
    color: #0000ff;
  }
  85.7% {
    filter: drop-shadow(0 0 8px #ff00ff);
    color: #ff00ff;
  }
  100% {
    filter: drop-shadow(0 0 8px #ff0000);
    color: #ff0000;
  }
}

.rainbow-text {
  transition: all 0.5s ease;
}

@media (min-width: 768px) {
  .group:hover .rainbow-text {
    animation: rainbow-glow 3s linear infinite;
  }
}

@media (max-width: 767px) {
  .rainbow-text {
    animation: rainbow-glow 5s linear infinite;
  }
}
</style>
