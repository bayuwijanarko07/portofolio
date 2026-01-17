<template>
    <ElementsCard class="flex flex-col space-y-1 p-4 sm:col-span-1">
        <span class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ label }}
        </span>
        <span>{{ value || "-" }}</span>
    </ElementsCard>
</template>
<script setup lang="ts">
    withDefaults(
        defineProps<{
            label: string
            value?: string | number
        }>(),
        {
            value: undefined,
        }
    )
</script>
