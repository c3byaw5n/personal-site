<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="fixed bottom-0 left-0 z-50 w-full p-4 text-center text-sm tracking-wider text-fuchsia-900/60"
  >
    &copy; {{ currentYear }} Haruhi Arai. All rights reserved.
  </footer>
</template>
