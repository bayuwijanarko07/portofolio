<template>
  <div :class="wrapperClass">
    <NuxtImg
      v-bind="attrs"
      :class="imageClass"
      loading="lazy"
      quality="100"
      @load="isLoading = false"
    />
  </div>
</template>

<script setup lang="ts">
    import { computed, ref, useAttrs } from 'vue'

    interface ImageProps {
    rounded?: string
    }

    defineProps<ImageProps>()
    const attrs = useAttrs()

    const isLoading = ref(true)

    const wrapperClass = computed(() => [
    'overflow-hidden',
    attrs.class,
    isLoading.value ? 'animate-pulse' : ''
    ])

    const imageClass = computed(() => [
    'duration-700 ease-in-out',
    isLoading.value
        ? 'scale-[1.02] blur-xl grayscale'
        : 'scale-100 blur-0 grayscale-0',
    attrs.class
    ])
</script>