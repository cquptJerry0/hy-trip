<template>
  <div class="app">
    <router-view/>
    <tab-bar v-if="!isHideTabBar"/>
  </div>
</template>

<script setup>
import { computed } from "vue"
import TabBar from "@/components/tab-bar/tab-bar.vue"
import { useRoute } from "vue-router"
const route = useRoute()
const isHideTabBar = computed(() => route.meta.hideTabBar)
</script>

<style scoped>

</style>
