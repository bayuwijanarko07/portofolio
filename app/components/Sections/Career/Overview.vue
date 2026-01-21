<template>
  <div class="grid grid-cols-1 gap-4">
    <Item
        v-for="car in CAREERS"
        :position="car.position"
        :company="car.company"
        :logo="car.logo"
        :link="car.link"
        :location="car.location"
        :location_type="car.location_type"
        :type="car.type"
        :start_date="car.start_date"
        :end_date="car.end_date"
        :industry="car.industry"
        :responsibilities="car.responsibilities"
        :lessons_learned="car.lessons_learned"
        :impact="car.impact"
    />
  </div>
</template>

<script setup lang="ts">
  import Item from './Item.vue' 
  import { CAREERS } from "@/common/constants/careers";
</script>
