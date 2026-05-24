<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'お探しの記事は見つかりませんでした',
    fatal: true,
  })
}

const siteConfig = useSiteConfig()

const siteName = siteConfig.name

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,

  ogTitle: () => (post.value?.title ? `${post.value.title} | ${siteName}` : siteName),
  ogDescription: () => post.value?.description,
  ogType: 'article',

  twitterTitle: () => (post.value?.title ? `${post.value.title} | ${siteName}` : siteName),
  twitterDescription: () => post.value?.description,
})
</script>

<template>
  <TheContentContainer>
    <article
      v-if="post"
      class="mx-auto max-w-4xl rounded-2xl bg-white/80 pb-20 backdrop-blur-md md:px-10"
    >
      <header class="mb-16 border-b border-fuchsia-900/10 pb-10 text-center">
        <time class="mb-4 block text-sm font-bold tracking-[0.2em] text-fuchsia-900/60">
          {{ formatDate(post.date) }}
        </time>

        <h1
          class="mb-6 text-3xl leading-tight font-bold tracking-wide text-fuchsia-950 md:text-4xl"
        >
          {{ post.title }}
        </h1>

        <div v-if="post.tags && post.tags.length > 0" class="flex justify-center gap-3">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded border border-fuchsia-900/30 bg-fuchsia-50/50 px-3 py-1 text-[10px] tracking-widest text-fuchsia-900/60 uppercase"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <div
        class="mx-auto prose max-w-none prose-fuchsia prose-headings:mt-12 prose-headings:font-bold prose-headings:tracking-widest prose-headings:text-fuchsia-950 prose-p:leading-loose prose-p:tracking-wider prose-p:text-fuchsia-950/80 prose-a:text-fuchsia-600 prose-a:transition-colors prose-a:hover:text-pink-600 prose-strong:text-fuchsia-950 prose-li:tracking-wider prose-li:text-fuchsia-950/80"
      >
        <ContentRenderer :value="post" />
      </div>

      <footer class="mt-30 text-center">
        <NuxtLink
          to="/blog"
          class="group inline-flex items-center gap-2 text-sm font-bold tracking-widest text-fuchsia-900/60 transition-colors hover:text-pink-600"
        >
          <Icon name="lucide:arrow-left" class="transition-transform group-hover:-translate-x-1" />
          BACK TO LIST
        </NuxtLink>
      </footer>
    </article>
  </TheContentContainer>
</template>
