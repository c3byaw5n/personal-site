<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 春 PERSONAL SITE` : '春 PERSONAL SITE'
  },
  description: '荒井 春陽のパーソナルサイト。エンジニアです。',

  ogTitle: '春 PERSONAL SITE',
  ogDescription: '荒井 春陽のパーソナルサイト。エンジニアです。',
  ogImage: '/og-image.png',
  ogUrl: 'https://haruhi-arai.me',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: '春 PERSONAL SITE',
  twitterDescription: '荒井 春陽のパーソナルサイト。エンジニアです。',
  twitterImage: '/og-image.png',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
