<script setup lang="ts">
</script>

<template>
  <div class="bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 min-h-screen">

    <PageContainer class="py-[68px] border-b dark:border-gray-100 border-gray-950">
      <header>
        Header
       <ToggleMode/>
      </header>
      <main>
        <slot />
      </main>
      <footer>
        Footer
      </footer>
    </PageContainer>
  </div>
</template>