<template>
    <div class="city-group">
      <van-index-bar :sticky="false" 
      :index-list="indexList">
        <van-index-anchor index="热门" />
        <div class="list">
           <template v-for="(city, index) in currentGroup.hotCities" :key="index">
            <div class="city" @click="cityClick(city)">{{  city.cityName }}</div>
           </template>
        </div>
        <template v-for="(group, index) in currentGroup.cities" :key="index">
                <van-index-anchor :index="group.group"/>
                <template v-for="(city, indey) in group.cities" :key="indey">
                        <van-cell :title="city.cityName" @click="cityClick(city)"/>
                 </template>
        </template>
      </van-index-bar>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import  { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
const props = defineProps({
    currentGroup: {
        type: Object,
        default: () => ({})
    }
})

//  索引列表
const indexList = computed(() => {
    return ['hot', ...props.currentGroup.cities.map(item => item.group)]
})

// 监听城市的点击
const cityStore = useCityStore()
const router = useRouter()
const cityClick = (city) => {
    // 选中当前城市
    cityStore.currentCity = city
    // 返回上一级 
    router.back()
}
</script>

<style lang="less" scoped>

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}


</style>