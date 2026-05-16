<script setup lang="ts">
const siteConfig = useSiteConfig()

const pageTitle = 'Works'
const siteName = siteConfig.name
const seoDescription = `${siteName}のこれまでに開発したプロジェクトや制作物の一覧です。`
const fullTitle = `${pageTitle} | ${siteName}`

useSeoMeta({
  title: pageTitle,
  description: seoDescription,

  ogTitle: fullTitle,
  ogDescription: seoDescription,
  ogType: 'profile',

  twitterTitle: fullTitle,
  twitterDescription: seoDescription,
})

const { data: worksData, error } = await useAsyncData('works', () =>
  queryCollection('works').first()
)

const works = computed(() => worksData.value?.works || [])
</script>

<template>
  <TheContentContainer>
    <div class="mb-12 flex flex-col items-center">
      <h1 class="mb-16 text-3xl font-bold tracking-widest uppercase">Works</h1>

      <div
        v-if="error"
        class="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center text-red-500"
      >
        <p>プロジェクトデータの読み込みに失敗しました。</p>
        <p class="text-sm opacity-70">しばらく経ってから再度アクセスしてください。</p>
      </div>

      <div v-else class="flex w-full max-w-5xl flex-col gap-16 md:gap-24">
        <article
          v-for="work in works"
          :key="work.title"
          class="group flex flex-col items-center gap-8 md:flex-row md:gap-16 md:even:flex-row-reverse"
        >
          <div
            class="w-full overflow-hidden rounded-xl border border-pink-900/20 shadow-xl md:w-1/2"
          >
            <NuxtImg
              :src="work.image"
              :alt="work.title"
              format="webp"
              loading="lazy"
              class="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div class="flex w-full flex-col text-left md:w-1/2">
            <h2 class="mb-4 text-2xl font-bold tracking-wider text-fuchsia-950">
              {{ work.title }}
            </h2>
            <p class="mb-6 leading-relaxed text-fuchsia-950/80">
              {{ work.description }}
            </p>

            <div class="flex flex-wrap items-center gap-6">
              <a
                v-if="work.github"
                :href="work.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm font-bold tracking-wider text-fuchsia-500 transition-colors hover:text-pink-600"
              >
                <Icon name="lucide:github" class="text-xl" />
                <span>Repository</span>
              </a>
              <a
                v-if="work.url"
                :href="work.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm font-bold tracking-wider text-fuchsia-500 transition-colors hover:text-pink-600"
              >
                <Icon name="lucide:external-link" class="text-xl" />
                <span>Website</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </TheContentContainer>
</template>
