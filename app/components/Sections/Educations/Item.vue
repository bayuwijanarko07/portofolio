<template>
    <ElementsCard class="flex items-start gap-5 p-6">
        <ElementsImage  
            :src="logo"
            :alt="school"
            width="70"
            height="70"
            loading="lazy"
        />
        <div class="space-y-1">
            <NuxtLink :href="link || '#'" target="_blank" rel="noopener">
                <h6>{{ school }}</h6>
            </NuxtLink>
            <div class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div class="flex flex-col gap-1 md:flex-row md:gap-2">
                    <span>{{ degree }}</span>
                    <span class="hidden text-neutral-300 dark:text-neutral-700 md:block">
                    •
                    </span>
                    <span>{{ major }}</span>
                </div>
                <div class="flex flex-col gap-1 text-[12px] md:flex-row md:gap-2">
                    <span class="dark:text-neutral-500">
                    {{ start_year }} - {{ end_year }}
                    </span>
                    <span class="hidden rounded-full text-neutral-300 dark:text-neutral-700 md:block">
                    •
                    </span>
                    <span>{{ location }}</span>
                </div>
            </div>
        </div>
    </ElementsCard>
</template>
<script setup lang="ts">
    defineProps<{
        school:string
        logo:string
        link:string
        degree: string
        major: string
        gpa: string | number
        start_year: number
        end_year: number
        location: string
    }>()
</script>
