<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ja',
  },
})

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 荒井 春陽` : '荒井 春陽'
  },
  ogType: 'website',
  ogSiteName: '荒井 春陽',
  twitterCard: 'summary_large_image',
  description: '荒井 春陽のパーソナルサイト。エンジニアです。',
  // ogImage: '',
  // twitterImage: '',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
