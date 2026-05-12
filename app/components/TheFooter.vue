<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="z-50 p-4 text-center text-sm tracking-wider text-fuchsia-900/60">
    &copy; {{ currentYear }} Haruhi Arai. All rights reserved.
  </footer>
</template>
