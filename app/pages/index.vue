<script setup lang="ts">
useSeoMeta({
  ogType: 'profile',
})

interface TechItem {
  name: string
  icon?: string
  isSpecial?: boolean
}

const MAX_PREVIEW_COUNT = 3

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

const { data: worksData } = await useAsyncData('recent-works', () =>
  queryCollection('works').first()
)

const recentWorks = computed<WorkItem[]>(
  () => worksData.value?.works?.slice(0, MAX_PREVIEW_COUNT) || []
)

const { data: blogData } = await useAsyncData('recent-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(MAX_PREVIEW_COUNT).all()
)

const recentBlogs = computed<BlogPost[]>(() => (blogData.value as BlogPost[]) || [])
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
            class="mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-pink-900/30 shadow-xl"
          >
            <NuxtImg
              src="/avatar.png"
              alt="Profile Icon"
              class="pointer-events-none h-full w-full object-cover select-none"
              format="webp"
              @contextmenu.prevent
            />
          </div>

          <h1 class="mb-4 text-4xl font-bold tracking-widest">荒井 春陽</h1>

          <div class="mb-10 flex items-center gap-8 text-fuchsia-500">
            <a
              href="https://github.com/c3byaw5n"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-pink-600"
              aria-label="GitHub"
            >
              <Icon name="lucide:github" class="text-2xl" />
            </a>
            <a
              href="https://x.com/あなたのユーザー名"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-pink-600"
              aria-label="X (Twitter)"
            >
              <Icon name="ri:twitter-x-fill" class="text-xl" />
            </a>
          </div>

          <div class="mb-20 flex w-full max-w-2xl flex-col">
            <h2
              class="mb-6 border-b border-fuchsia-200/50 pb-2 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase"
            >
              About
            </h2>

            <div
              class="prose text-lg prose-p:text-fuchsia-950/80 prose-a:text-fuchsia-600 prose-a:transition-colors prose-a:hover:text-pink-600"
            >
              <p>2002年生まれ。青森県を拠点に活動するエンジニアです。</p>
              <p>
                高校卒業後、2020年に新卒で
                <a href="https://www.terasol.co.jp/" target="_blank" rel="noopener noreferrer">
                  株式会社テラソリューション
                </a>
                に入社し、現在ではバックエンドからフロントエンドまで幅広く担当しています。
              </p>
              <p>
                開発においては「無駄を削ぎ落としたシンプルで保守性の高い設計」を好む一方で、未知の技術や表現（WebGLなど）にも積極的に挑戦し、技術の幅を広げることを大切にしています。
              </p>
            </div>
          </div>

          <div class="mb-20 flex w-full max-w-2xl flex-col">
            <h2
              class="mb-6 border-b border-fuchsia-200/50 pb-2 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase"
            >
              Tech Stack
            </h2>

            <div class="mb-6 flex flex-wrap gap-6">
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
          </div>

          <div class="mb-20 flex w-full max-w-2xl flex-col">
            <h2
              class="mb-6 border-b border-fuchsia-200/50 pb-2 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase"
            >
              Currently Learning
            </h2>

            <div class="flex flex-wrap gap-6">
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
                    class="-mt-px animate-rainbow-mobile text-3xl font-bold transition-all duration-500 ease-in-out select-none group-hover:scale-110 md:animate-none md:grayscale md:group-hover:animate-rainbow-desktop"
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

          <div v-if="recentBlogs.length > 0" class="mb-20 flex w-full max-w-2xl flex-col">
            <div class="mb-6 flex items-end justify-between border-b border-fuchsia-200/50 pb-2">
              <h2 class="text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
                Recent Posts
              </h2>
              <NuxtLink
                to="/blog"
                class="group flex cursor-pointer items-center text-xs font-bold tracking-widest text-fuchsia-400 transition-colors hover:text-pink-600"
              >
                VIEW ALL
                <Icon
                  name="lucide:arrow-right"
                  class="text-base transition-transform group-hover:translate-x-1"
                />
              </NuxtLink>
            </div>

            <div class="flex flex-col gap-4">
              <NuxtLink
                v-for="post in recentBlogs"
                :key="post.path"
                :to="post.path"
                class="group flex flex-col justify-between rounded-xl border border-fuchsia-100 bg-white/40 p-5 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-start"
              >
                <div class="flex flex-col pr-4">
                  <h3
                    class="mb-1.5 text-sm font-bold tracking-wide text-fuchsia-900 transition-colors group-hover:text-fuchsia-700"
                  >
                    {{ post.title }}
                  </h3>

                  <p class="mb-3 line-clamp-1 text-xs leading-relaxed text-fuchsia-950/60">
                    {{ post.description }}
                  </p>

                  <div v-if="post.tags" class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in post.tags"
                      :key="tag"
                      class="rounded bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-600"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div
                  class="mt-3 text-[11px] font-bold tracking-widest whitespace-nowrap text-fuchsia-400 sm:mt-0.5"
                >
                  {{ formatDate(post.date) }}
                </div>
              </NuxtLink>
            </div>
          </div>

          <div v-if="recentWorks.length > 0" class="mb-20 flex w-full max-w-2xl flex-col">
            <div class="mb-6 flex items-end justify-between border-b border-fuchsia-200/50 pb-2">
              <h2 class="text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
                Recent Works
              </h2>
              <NuxtLink
                to="/works"
                class="group flex cursor-pointer items-center text-xs font-bold tracking-widest text-fuchsia-400 transition-colors hover:text-pink-600"
              >
                VIEW ALL
                <Icon
                  name="lucide:arrow-right"
                  class="text-base transition-transform group-hover:translate-x-1"
                />
              </NuxtLink>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <a
                v-for="work in recentWorks"
                :key="work.title"
                :href="work.url || work.github"
                target="_blank"
                rel="noopener noreferrer"
                class="group block overflow-hidden rounded-xl border border-fuchsia-100 bg-white/40 p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
              >
                <div class="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-fuchsia-50">
                  <NuxtImg
                    :src="work.image"
                    :alt="work.title"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                    format="webp"
                  />
                </div>
                <h3
                  class="mb-2 text-sm font-bold tracking-wide text-fuchsia-900 group-hover:text-fuchsia-700"
                >
                  {{ work.title }}
                </h3>
                <p class="line-clamp-2 text-xs leading-relaxed text-fuchsia-950/70">
                  {{ work.description }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </TheContentContainer>
    </Transition>
  </div>
</template>
