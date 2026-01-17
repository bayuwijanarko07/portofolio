<template>
  <section v-if="isActive" class="space-y-2">
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
      :data="data"
      :pending="pending"
      :error="error"
    />

  </section>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Overview from './Overview.vue'
import { WAKATIME_ACCOUNT } from '@/common/constants/wakatime'
import type { WakaCombinedResult } from '@/types/wakatime'
import { formatRelativeJakarta } from '@/utils/date'

const { t } = useI18n()
const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

const isActive = WAKATIME_ACCOUNT.is_active

const { data, pending, error } = await useAsyncData(
  'wakatime',
  () => $fetch<WakaCombinedResult>('/api/wakatime')
)

const lastUpdateText = computed(() =>
  data.value?.stats?.last_update
    ? formatRelativeJakarta(data.value.stats.last_update)
    : '-'
)
</script>

