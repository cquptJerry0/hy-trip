<template>
    <div class="city top-page">
        <div class="top">
                <!-- 搜索框-->
        <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置" 
        shape="round" 
         show-action
         @cancel="cancelClick"
         />  
        <!-- tab-->
         <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3px">
            <template v-for="(value, key, index) in allCities" :key="key">
                <van-tab :title="value.title" :name="key"></van-tab>
            </template>
        </van-tabs>
        </div>
        <div class="content">
            <template v-for="(value, key, index) in allCities" :key="key">
                <city-group v-show="tabActive === key" :currentGroup="value" />
            </template>
        </div>
    </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import cityGroup from "./cpns/city-group.vue";
import useCityStore from "@/stores/modules/city";

/* 搜索框 */
const searchValue = ref("")
/* 路由 */
const router = useRouter()
const cancelClick = () => {
    router.back()
}

/*
* 在这个位置发送网络请求有两个缺点:
* 1. 如果网络请求太多, 那么页面组件中就包含大量对网络请求和数据的处理逻辑
* 2. 如果页面封装了很多子组件, 子组件需要一步步地传props
*/
/* 网络请求 获取城市列表 */
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
const tabActive = ref({})

const currentGroup = computed(() => {
    return allCities.value[tabActive.value]
})
</script>

<style lang="less" scoped>

.city {
    .top {
        position: relative;
        z-index: 9;
    }

    // 布局滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: scroll;
        /* 隐藏滚动条 */
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;
        /* IE/Edge */
    }

    /* Webkit浏览器 (Chrome, Safari) */
    .content::-webkit-scrollbar {
        display: none;
    }
}
</style>