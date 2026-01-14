<template>
  <ClientOnly>
    <div class="locale-switcher">
      <select 
        v-model="currentLocale" 
        @change="changeLanguage"
        class="px-3 py-1.5 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="id">🇮🇩</option>
        <option value="en">🇺🇸</option>
      </select>
    </div>

  </ClientOnly>
</template>

<script setup>
  import { useI18n } from '#imports'

  const { locale, setLocale } = useI18n()
  const currentLocale = ref('id')

  onMounted(() => {
    currentLocale.value = locale.value
  })

  watch(locale, (newLocale) => {
    currentLocale.value = newLocale
  })

  const changeLanguage = () => {
    setLocale(currentLocale.value)
  }
</script>