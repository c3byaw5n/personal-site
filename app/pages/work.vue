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
</script>

<template>
  <TheContentContainer>
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-3xl font-bold tracking-widest uppercase">Works</h1>
      <p class="text-fuchsia-950/80">Coming soon...</p>
    </div>
  </TheContentContainer>
</template>
