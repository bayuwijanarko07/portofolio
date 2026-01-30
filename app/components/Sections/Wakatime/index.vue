<template>
  <section v-if="isActive" class="space-y-2 px-4 md:px-10 mx-auto w-full">
    <ElementsHeader
      :title="tWaka('title')"
      icon="octicon:check-circle-24"
    />

    <ElementsSubHeader>
      {{ tWaka('sub_title') }}
      <ClientOnly>
        <NuxtLink
          href="https://wakatime.com/@bayuwijanarko07"
          target="_blank"
          class="text-sm text-neutral-600 hover:text-neutral-800
                dark:text-neutral-500 dark:hover:text-neutral-400"
        >
          {{ tWaka('last_update') }}: {{ lastUpdateText }}
        </NuxtLink>
      </ClientOnly>
    </ElementsSubHeader>

    <p v-if="pending">Loading…</p>
    <p v-else-if="error" class="text-red-500">Failed to load data</p>

    <Overview
      v-else
      :stats="store.stats"
      :all-time="store.allTime"
      :pending="pending"
      :error="error"
    />

    <p v-if="pending">Loading…</p>
    <p v-else-if="error" class="text-red-500">Failed to load data</p>
    <WakaLanguageChart
      v-else
      :stats="store.stats"
      :all-time="store.allTime"
      :pending="pending"
      :error="error"
    />
  </section>
</template>

<script setup lang="ts">
  import Overview from './Overview.vue'
  import WakaLanguageChart from './WakaLanguageChart.vue'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { WAKATIME_ACCOUNT } from '@/common/constants/wakatime'
  import { useWakatimeStore } from '@/stores/wakatime'
  import { formatRelativeJakarta } from '@/utils/date'

  const { t } = useI18n()
  const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

  const isActive = WAKATIME_ACCOUNT.is_active

  const store = useWakatimeStore()

  onMounted(() => {
    store.fetch()
  })

  const pending = computed(() => store.pending)
  const error = computed(() => store.error)

  const lastUpdateText = computed(() =>
    store.lastUpdate
      ? formatRelativeJakarta(store.lastUpdate)
      : '-'
  )
</script>

