<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: 'Error',
  description: 'エラーが発生しました。',
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <TheContentContainer>
      <div class="flex flex-col items-center">
        <div class="mb-12 flex h-32 w-32 items-center justify-center">
          <Icon name="lucide:alert-circle" class="text-6xl text-fuchsia-500 opacity-80" />
        </div>

        <h1 class="mb-6 text-3xl font-bold tracking-[0.3em] uppercase">Error {{ error.status }}</h1>

        <h2 class="mb-8 text-xs font-bold tracking-[0.3em] text-fuchsia-500 uppercase">
          {{ error?.status === 404 ? 'Page Not Found' : 'Internal Server Error' }}
        </h2>

        <div class="mb-12 max-w-2xl text-lg leading-relaxed tracking-widest">
          <p v-if="error?.status === 404">
            お探しのページは、移動したか削除された可能性があります。
          </p>
          <p v-else>予期せぬエラーが発生しちゃいました。</p>
        </div>

        <button
          class="group flex cursor-pointer items-center gap-2 rounded-full px-8 py-3 text-sm font-bold tracking-widest text-fuchsia-900/60 transition-colors hover:bg-fuchsia-50 hover:text-fuchsia-900"
          @click="handleError"
        >
          <Icon name="lucide:arrow-left" class="transition-transform group-hover:-translate-x-1" />
          TOPページへ戻る
        </button>
      </div>
    </TheContentContainer>
  </NuxtLayout>
</template>
