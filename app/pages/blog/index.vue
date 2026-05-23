<script setup lang="ts">
const siteConfig = useSiteConfig()

const pageTitle = 'Blog'
const siteName = siteConfig.name
const fullTitle = `${pageTitle} | ${siteName}`
const seoDescription = '日々の学びや技術的な知見をまとめたブログ記事一覧です。'

useSeoMeta({
  title: pageTitle,
  description: seoDescription,

  ogTitle: fullTitle,
  ogDescription: seoDescription,

  twitterTitle: fullTitle,
  twitterDescription: seoDescription,
})

const { data: rawPosts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .select('path', 'title', 'description', 'date', 'tags')
    .order('date', 'DESC')
    .all()
)

const allPosts = computed<BlogPost[]>(() => (rawPosts.value as BlogPost[]) || [])

const searchQuery = ref('')
const selectedTag = ref<string | null>(null)
const isTagsExpanded = ref(false)
const INITIAL_DISPLAY_COUNT = 10
const displayCount = ref(INITIAL_DISPLAY_COUNT)

const availableTags = computed<string[]>(() => {
  const tags = allPosts.value.flatMap((post) => post.tags || [])
  return Array.from(new Set(tags))
})

const filteredPosts = computed<BlogPost[]>(() => {
  let posts = allPosts.value

  if (selectedTag.value) {
    posts = posts.filter((post) => post.tags?.includes(selectedTag.value!))
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(query) || post.description?.toLowerCase().includes(query)
    )
  }

  return posts
})

const displayedPosts = computed<BlogPost[]>(() => {
  return filteredPosts.value.slice(0, displayCount.value)
})

const hasMore = computed(() => displayCount.value < filteredPosts.value.length)

const loadMore = () => {
  displayCount.value += INITIAL_DISPLAY_COUNT
}

watch([searchQuery, selectedTag], () => {
  displayCount.value = INITIAL_DISPLAY_COUNT
})
</script>

<template>
  <TheContentContainer>
    <div class="flex flex-col items-center">
      <h1 class="mb-8 text-3xl tracking-widest text-fuchsia-950 md:text-4xl">{{ pageTitle }}</h1>

      <div class="relative mb-3 w-full max-w-96">
        <Icon
          name="lucide:search"
          class="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-fuchsia-900/40"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="タイトルや内容で検索..."
          class="w-full rounded-full border border-fuchsia-900/30 bg-white/50 py-2 pr-4 pl-12 text-sm text-fuchsia-950 placeholder-fuchsia-900/60 transition-all focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 focus:outline-none"
        />
      </div>

      <div
        v-if="availableTags.length > 0"
        class="mb-6 flex w-full max-w-2xl items-center justify-center"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <button
            v-if="!isTagsExpanded"
            aria-controls="tags-panel"
            :aria-expanded="isTagsExpanded"
            class="group flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs tracking-widest text-fuchsia-900/80 transition-all hover:bg-fuchsia-50 hover:text-fuchsia-900"
            @click="isTagsExpanded = true"
          >
            <Icon name="lucide:tag" class="text-sm transition-transform group-hover:scale-110" />
            <span v-if="selectedTag" class="font-bold text-fuchsia-900">
              選択中: #{{ selectedTag }}
            </span>
            <span v-else>タグで絞り込みをする</span>
            <Icon
              name="lucide:chevron-down"
              class="text-sm transition-transform group-hover:translate-y-0.5"
            />
          </button>

          <div v-else id="tags-panel" class="flex w-full flex-col items-center">
            <div class="mb-4 flex flex-wrap justify-center gap-3">
              <button
                class="cursor-pointer rounded-full border px-4 py-1.5 text-xs tracking-wider transition-colors"
                :class="
                  selectedTag === null
                    ? 'border-fuchsia-900 bg-fuchsia-900 text-white'
                    : 'border-fuchsia-900/20 text-fuchsia-900/60 hover:bg-fuchsia-50'
                "
                @click="selectedTag = null"
              >
                ALL
              </button>
              <button
                v-for="tag in availableTags"
                :key="tag"
                class="cursor-pointer rounded-full border px-4 py-1.5 text-xs tracking-wider uppercase transition-colors"
                :class="
                  selectedTag === tag
                    ? 'border-fuchsia-900 bg-fuchsia-900 text-white'
                    : 'border-fuchsia-900/20 text-fuchsia-900/60 hover:bg-fuchsia-50'
                "
                @click="selectedTag = tag"
              >
                #{{ tag }}
              </button>
            </div>

            <button
              class="group flex cursor-pointer items-center gap-1 rounded-full px-5 py-2.5 text-xs font-bold tracking-widest text-fuchsia-900/80 transition-colors hover:bg-fuchsia-50 hover:text-fuchsia-900"
              @click="isTagsExpanded = false"
            >
              閉じる
              <Icon
                name="lucide:chevron-up"
                class="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </Transition>
      </div>

      <div v-if="displayedPosts.length > 0" class="w-full space-y-12">
        <article v-for="post in displayedPosts" :key="post.path" class="group">
          <NuxtLink :to="post.path" class="block space-y-3">
            <time class="text-xs font-bold tracking-[0.2em] text-fuchsia-900/60">
              {{ formatDate(post.date) }}
            </time>
            <h2
              class="text-xl font-bold text-fuchsia-950 transition-colors group-hover:text-fuchsia-700 md:text-2xl"
            >
              {{ post.title }}
            </h2>
            <p class="line-clamp-2 text-sm leading-relaxed text-fuchsia-950/70">
              {{ post.description }}
            </p>
            <div v-if="post.tags && post.tags.length > 0" class="flex gap-3 pt-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="rounded border border-fuchsia-900/30 bg-fuchsia-50/50 px-2 py-0.5 text-[10px] tracking-widest text-fuchsia-900/60 uppercase"
              >
                #{{ tag }}
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div v-else class="py-20 tracking-widest text-fuchsia-900">
        該当する記事が見つかりませんでした。
      </div>

      <div v-if="hasMore" class="mt-16">
        <button
          class="group flex cursor-pointer items-center gap-1 rounded-full px-8 py-3 text-xs font-bold tracking-widest text-fuchsia-900/80 transition-colors hover:bg-fuchsia-50 hover:text-fuchsia-900"
          @click="loadMore"
        >
          もっと見る
          <Icon name="lucide:chevron-down" class="transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </div>
  </TheContentContainer>
</template>
