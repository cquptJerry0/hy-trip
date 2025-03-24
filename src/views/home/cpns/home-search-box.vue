<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期选择 -->
    <div class="section date-range" @click="showCanlder = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCanlder" 
    type="range" 
    color="#ff9854" 
    :show-confirm="false"
     @confirm="onConfirm" />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
       <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="item"
        :style="{
          color: item.tagText.color, 
          backgroundColor: item.tagText.background.color  
        }"
        >
          {{ item.tagText.text }}
        </div>
       </template>
      
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>

</template>

<script setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { formatDate, getDiffDays } from '@/utils/format_data'
import useCityStore from '@/stores/modules/city'
import { ref, computed } from "vue"
import useHomeStore from '@/stores/modules/home'
import useMainStore from "@/stores/modules/main"

const router = useRouter()

//  位置/城市
const cityClick = () => {
  router.push("/city")
}
const positionClick = () => {
  console.log("位置点击")
  navigator.geolocation.getCurrentPosition(res => {
    console.log("获取位置成功:", res)
  }, err => {
    console.log("获取位置失败:", err)
  }), {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
}

// 当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)


// 导入主状态仓库
const mainStore = useMainStore()
// 通过storeToRefs解构获取响应式的开始和结束日期
// 使用storeToRefs保持响应式特性，不会丢失响应性
const { startDate, endDate } = storeToRefs(mainStore)

// 计算属性：格式化开始日期，将日期对象转为字符串格式（如：2023-05-15）
// 当startDate变化时，此计算属性会自动更新
const startDateStr = computed(() => {
  return formatDate(startDate.value)
})

// 计算属性：格式化结束日期，同样转为字符串格式
// 当endDate变化时，此计算属性会自动更新
const endDateStr = computed(() => {
  return formatDate(endDate.value)
})

// 计算属性：计算入住天数（入住日期到离店日期的天数差）
// 使用getDiffDays函数计算两个日期之间的天数差
const stayCount = computed(() => {
  return getDiffDays(startDate.value, endDate.value)
})

// 控制日历组件的显示与隐藏的响应式变量
// 默认为false，即不显示日历
const showCanlder = ref(false)

// 日期选择确认后的回调函数
// date是一个数组，包含选择的开始日期[0]和结束日期[1]
const onConfirm = (date) => {
  // 更新store中的开始日期
  mainStore.startDate = date[0]
  // 更新store中的结束日期
  mainStore.endDate = date[1]
  // 重新计算入住天数
  // 注意：这里直接通过mainStore访问而不是通过之前解构出的响应式变量
  stayCount.value = getDiffDays(mainStore.startDate, mainStore.endDate)
  // 隐藏日历组件
  showCanlder.value = false
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)


// 搜索按钮
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value  ,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 2px;
      color: #666;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;
  justify-content: space-between;
  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

</style>