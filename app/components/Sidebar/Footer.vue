<template>
    <div class="items-center gap-2 py-2 rounded-lg group
      text-neutral-700 dark:text-neutral-400
      hover:text-neutral-900 hover:dark:text-neutral-300
      bg-blue-100 dark:bg-neutral-800 text-center text-sm">
        <div class="px-2">{{ tFooter('title') }}</div>
        <div class="p-2">© {{ dateNow() }} {{ tFooter('sub_title') }}</div>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
    const tFooter = (key: string) => t(`Footer.${key}`)

    const dateNow = () => {
        return new Date().getFullYear()
    }
</script>