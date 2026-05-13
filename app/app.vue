<script setup lang="ts">
const url = useRequestURL()
const siteConfig = useSiteConfig()

const siteName = siteConfig.name
const seoDescription = `${siteName}のポートフォリオ兼技術ブログ。エンジニアとしての日々の開発記録を発信しています。`
const siteUrl = siteConfig.url

useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

useSeoMeta({
  author: siteName,

  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${siteName}` : siteName
  },
  description: seoDescription,

  ogTitle: siteName,
  ogDescription: seoDescription,
  ogType: 'website',
  ogUrl: url.href,
  ogImage: `${siteUrl}/og-image.png`,

  twitterTitle: siteName,
  twitterDescription: seoDescription,
  twitterImage: `${siteUrl}/og-image.png`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
