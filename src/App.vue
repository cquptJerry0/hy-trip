<template>
  <div class="app">
    <router-view class="page" />
    <tab-bar v-if="!isHideTabBar"/>
    <!-- <tab-bar class="tab-bar"/> -->

    <loading/>
  </div>
</template>

<script setup>
import { computed } from "vue"
import TabBar from "@/components/tab-bar/tab-bar.vue"
import { useRoute } from "vue-router"
import Loading from "@/components/loading/loading.vue"

const route = useRoute()
const isHideTabBar = computed(() => route.meta.hideTabBar)
// const dataVRouter = computed(() => route.name)
</script>

<style scoped>
/* 如果你想要平滑的过渡效果，可以这样写： */
/* .tab-bar {
  transition: all 0.3s ease;
}

.search.page ~ .tab-bar {
  transform: translateY(100%);
  opacity: 0;
} */
</style>
