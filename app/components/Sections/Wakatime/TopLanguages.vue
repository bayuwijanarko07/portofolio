<template>
  <ElementsCard class="flex flex-col gap-y-3 p-4">
    <p class="text-neutral-600 dark:text-neutral-400">{{ tWaka("languages") }}</p>
    <ul  class="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
      <li v-for="lang in data?.topLanguages ?? []" :key="lang.name">
        {{ lang.name }} - {{ lang.text }}
      </li>
    </ul>
  </ElementsCard>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { WakaCombinedResult } from '@/types/wakatime'

  const { t } = useI18n()
  const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

  const props = defineProps<{
    data?: WakaCombinedResult
    pending: boolean
    error: any
  }>()

  const data = computed(() => {
    const stats = props.data?.stats

    if (!stats) return null

    return {
      topLanguages: stats.languages?.map(l => ({
        name: l.name,
        text: l.text,
      })) ?? [],
    }
  })

</script>