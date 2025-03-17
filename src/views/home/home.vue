<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
  </div>
</template>

<script setup>

import HomeNavBar from "./cpns/home-nav-bar.vue"
import homeSearchBox from "./cpns/home-search-box.vue";

// 发送网络请求
// 1.热门建议
</script>

<style lang="less" scoped>
.banner{
  img{
    width: 100%;
  }
}
</style>
