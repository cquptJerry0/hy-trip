<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <div class="search-bar-content">
        <div class="search-bar-title">
          <span>搜索</span>
          <span>搜索</span>
        </div>
      </div>
    </div>

    <home-content />
   

  </div>
</template>

<script setup>

import useHomeStore from "@/stores/modules/home";
import HomeNavBar from "./cpns/home-nav-bar.vue"
import homeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import HomeContent from "./cpns/home-content.vue";
import useScroll from "@/hooks/useScroll";
import { watch, computed } from "vue";

// 发送网络请求
// 1.热门建议
const homeStore = useHomeStore()
homeStore.fetchHotSuggestions() 
homeStore.fetchCategories()
homeStore.fetchHomeHouselist()

// 监听window创建的滚动
// 1. 当我们离开页面时候, 移除监听
// 2. 会重复代码

// const scrollListenerHandler = () => {
//   const scrollTop = document.documentElement.scrollTop
//   const scrollHeight = document.documentElement.scrollHeight
//   const clientHeight = document.documentElement.clientHeight
//   if(scrollTop + clientHeight >= scrollHeight) {
//     homeStore.fetchHomeHouselist()
//   }
// }


const { isReacBottom, scrollTop } = useScroll()

watch(isReacBottom, (newValue) => {
  if(newValue) {
    homeStore.fetchHomeHouselist().then(() => {
      isReacBottom.value = false
    })
  }
})

// 监听搜索框的显示
const isShowSearchBar = computed(() => {
  return scrollTop.value > 100
})

</script>

<style lang="less" scoped>
.home {
 
 
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}


</style>
