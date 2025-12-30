<script setup>
const colorMode = useColorMode()
</script>

<template>
  <button
    @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
  >
    <span v-if="colorMode.value === 'dark'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>
