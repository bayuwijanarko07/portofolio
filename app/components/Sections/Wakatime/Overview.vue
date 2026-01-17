<template>
  <div class="grid gap-3">
    <Item label="Tanggal Mulai" :value="waka.startDate" />
    <Item label="Tanggal Selesai" :value="waka.endDate" />
    <Item label="Rata-rata Harian" :value="waka.dailyAverage" />
    <Item label="Total Minggu Ini" :value="waka.totalThisWeek" />
    <Item label="Total Sejak Bergabung" :value="waka.totalAllTime" />
    <Item label="Hari Terbaik" :value="waka.bestDayText" />

    <ul>
        <li v-for="lang in waka.topLanguages" :key="lang.name">
        {{ lang.name }} - {{ lang.text }}
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
    import Item from './Item.vue'
    import { useI18n } from '#imports'
    import { onMounted } from 'vue'
    import { useWakatimeStore } from '@/stores/wakatime'

    const { t } = useI18n()
    const waka = useWakatimeStore()

    const tWaka = (key: string) =>
    t(`DashboardPage.wakatime.${key}`)

    onMounted(() => {
        waka.fetchWakatime()
    })
</script>
