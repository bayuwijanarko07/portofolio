<template>
  <div class="grid grid-cols-1 gap-4">
    <Item
        v-for="edu in EDUCATION"
        :school="edu.school"
        :logo="edu.logo"
        :link="edu.link"
        :degree="edu.degree"
        :major="edu.major"
        :gpa="edu.GPA"
        :start_year="edu.start_year"
        :end_year="edu.end_year"
        :location="edu.location"
    />
  </div>
</template>

<script setup lang="ts">
  import Item from './Item.vue' 
  import { EDUCATION } from "@/common/constants/education";
</script>
